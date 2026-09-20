## UE Tips

### 1.Material

*  Control Texture Rgb  Channel  select

    * <img src="./images/UnrealEditor_VriAEQZe7o.png" width="400" />

* inside MF_Refine

    * <img src="./images/UnrealEditor_vTH1QAUxOu.png" width="400" />
    
    * R ：越大，光晕的边缘收缩得越紧、越硬；R 越小，光晕越柔和、虚化面积越大。
    * G ：控制“硬射线”有多亮。
    * B ：控制“中心大柔光团”有多亮。
    * A : 松紧带（调节硬射线与柔光团的混合比例，越靠近1越平滑柔和）。
         * <img src="./images/UnrealEditor_utMmyyvAGS.png" width="400" />
         * <img src="./images/chrome_GkWKqdYrt4.png" width="400" />
         可以理解为亮的更加亮了但是长度也被power弄没了总体变小了

* DepthFade 
    * 控制贴图和模型的接缝羽化
    * <img src="./images/chrome_qEQKcRG28E.png" width="400" />   
    * <img src="./images/UnrealEditor_Msk0bvXTx4.png" width="400" />   

* Camoffset （particle sim）
    * 越大显示的越近，越明显

### 2.Projects
* shockwave
    * material

        * <img src="./images/UnrealEditor_tJ5MpVqKAR.png" width="400" />   

        * 问题：texture 直接拖进去,无法rename和设置group  
        * 解决：在菜单里点击 Convert to Parameter（转换为参数）。

        * 问题：为什么我材质实例化里面有折射,但是视图里播放没有
        * 解决：材质给normal（vertexNormalWS） 

        * <img src="./images/UnrealEditor_MfLMde8WH8.png" width="400" />    
        
* Boom center
    * material   

    * <img src="./images/UnrealEditor_9xM4KWVgDd.png" width="400" />      

        * 问题：uv to 笛卡尔坐标系（平时用的xy轴）
        * 解决：sub 0.5

        * 问题：笛卡尔坐标系 to 极坐标
        * 解决：VectorToRadialValue 

        * Panner(快捷键P) 加动画

        * 问题：直接power和multiply区别
        * 解决：power在GPU上的开销相对较高但可控，multiply节省资源

        * 问题：Dynamic Parameter 有什么作用
        * 解决：允许粒子系统（如 Niagara 或 Cascade）在运行时（Runtime），
        * 将粒子自身的实时数据动态地传递给材质，从而让材质根据粒子的状态发生视觉变化。

* ALL
     * <img src="./images/UeLihghting.gif" width="400" />   

     * 这里讲下闪电的做法：
        #### 1.材质
        * 材质用到是之前的 shockwave的材质实例

        * <img src="./images/UnrealEditor_5Ta1e73OoH.png" width="400" />  
        
        * 问：Refine  RGBA 表示着什么意思
        * 答：首先解释下材质里的MF_Refine节点
        * 公式
        ```python
        Result = Lerp(
            Original,
            RefineVersion,
            Alpha
            )
        ```  
        * 其中
        ``` python
        RefineVersion =
        pow(Texture , R)* G  
        ##Blue通道单独：
        Texture × B
        ``` 
        ``` python
        Lerp(Pow(Texture,R)*G,Texture*B,Alpha)
        ``` 
        
        * * 🟥 **R** : 0.5 → 0.25 == 亮部保留暗部压暗 == 亮度曲线(Gamma)

        * * 🟩 **G** : 1 → 0.5 ==亮度减半 == 控制增强后的整体强度

        * * 🟦 **B** : 0 → 1 → 2 ==原图不变 → 原图亮两倍 → 原图消失 == 控制原图保留量

        * * 🟨 **A** : Lerp 原图和改的图的百分比

        * 这组参数会让：(2,1,1,0.1)
        * * 发光区域收缩
        * * 边缘更利落
        * * 细丝更明显
        * * 能量感更强
        * * 不会明显改变颜色

        #### 2.粒子发射源
        * <img src="./images/UnrealEditor_14XiJjSpPR.png" width="400" />  

        Emitter Spawn
            ↓
        Emitter Update
            ↓
        Particle Spawn
            ↓
        Particle Update
            ↓
        Render

        * Emitter Spawn创建时只执行一次  // Emitter Update 每帧执行 //Particle Spawn每个粒子出生时执行一次 //Particle Update 每个粒子每帧执行

        * 闪电
        * Emitter Spawn
            创建发射器

        * Emitter Update
            * * Burst生成闪电粒子

        * Particle Spawn
            * * 初始化寿命
            * * 随机UV
            * * 锥体方向速度

        * Particle Update
            * * 缩放颜色
            * * 缩放大小
            * * 播放闪电序列帧
            * * 更新运动

        * Render
            * * Sprite Renderer
            * * 使用M_FX_SimpleParticle材质

        * 选择贴图到Sprite Renderer >Emitter(SpawnBurst)5个粒子 > SpriteRender (Sub uv 4*2 )>InitializeParticle (大小500 +muplty float + range )
        * Addvelocity + SpriteRenderer(Alignment 对齐速度方向)  希望发射的闪电四面八方半圆形 （pivot 默认是0.5，0.5卡片中心）>每次发射的闪电是不同贴图 Particle Spawn -sub UVAnimation --- Particle Update -sub UVAnimation

        *  <img src="./images/hqeHJXVPcu.png" width="400" />  

        * <img src="./images/2BDg60qjtD.png" width="400" />  

        * ParticleSpawn>SubUVAnimation 让每帧出的图是随机的
        *  <img src="./images/ApmpGjqsIe.png" width="400" />  
        * Particle Update -sub UVAnimation
        *  <img src="./images/UnrealEditor_pUCnAyyiMM.png " width="400" /> 
            * 问：为什么同时要2个起什么作用
            * 答：Particle Spawn → Sub UV Animation  这里是在粒子刚出生时执行一次。
            * 作用：给每个新生成的粒子随机指定一个起始贴图帧。 这样就不会出现：所有粒子都显示同一张图，否则会非常整齐，看起来很假。
            * Particle Update → Sub UV Animation 这里是在粒子每一帧都更新。
            * 作用：控制粒子的动画如何播放。
            * Spawn 负责 "从哪一帧开始"  Update 负责"之后怎么播放"



        * 丰富颜色 
        * 思路：A,B 2中颜色lerp 80%传统颜色 20%其他色，A,B自身又是从自身颜色到黑色的/  Alpha 突然减落的
        * ParticleUpdate>Scale color >Make Vector Color > Rang Linear Color >Lerp Linear Color>color Curve

        *  <img src="./images/UnrealEditor_mORYWjt4RQ.png" width="400" />  

        

        * <img src="./images/UnrealEditor_wHIiPjINmP.png" width="400" />  
        
        * initialize particles
        * <img src="./images/UnrealEditor_ABk96LdcLo.png" width="400" />  
        

        * Emitter State >Spawn Rate  每帧多发射 （但是他是过0.1帧在触发的 使用要补个Spawn Burst）

        * <img src="./images/UnrealEditor_557NhGhMbK.png" width="400" />  
        * 这个 Emitter 只运行一次，持续 0.15 秒，然后停止。也就是可以让闪电持续了一段时间
        * 真实闪电一般：出现 → 亮一下 → 消失
        * Loop Behavior = Once
        * Loop Duration = 0.1~0.2

### 3.RockBroken
* <img src="./images/UeRock.gif" width="400" /> 
* 思路：制作石头发光材质——粒子发射mesh
    * #### 1.材质
        基础材质：
        * <img src="./images/UnrealPBR.png" width="400" /> 

            * CheapContrast (快速对比度)调整输入图像调整输入图像（和power有点像但是比他更加快）

            * Desaturation (去色)降低输入图像的色彩饱和度，使其向黑白（灰度图）转变。
        EmissiveColor    
        * <img src="./images/UnrealEmissiveColor.png" width="400" /> 

            * 把材质的rougthness拿过来做1-x和CheapContrast，目的：提取出石头缝隙做ao光
            * 加入noise动画丰富细节，连如DynamicParameter实现在后面解算中控制石头亮度。（EmissiveTypeTransform 0→1 ，直接使用发光→ 纹理高光 ）
            * MF_TonnemappingCorrect自定义材质，目的:以确保最终屏幕上呈现出来的特效光效既刺眼明亮，又能保持极其纯正的色彩饱和度。
            * <img src="./images/UnrealEditor_sEeiclQ7EM.png" width="400" /> 

            * Dot法线 目的：做mask去控制发光区域 由dot运算我们可知得到一个（-1，1）的结果。类似h中做顶上雪堆积理解
    * #### 2.粒子发射  
        * <img src="./images/UnrealRockParticles.png" width="400" /> 
        * 和之前的粒子发射有所不同这里是mesh render
        * Tip:在主材质中有个Max Pool Size :32 ，意味着：对象池最多缓存 32 个实例。如果超过这个数量粒子发射会不在生成，需要注意粒子寿命的设置
        * 在LocalModules中我们自定义了一个NM_SetVectorDynamicParam                                                  （-1，-1，-1//1，1，1）来控制我们值的dot轴（顶部随机有高亮流光）

        * ##### 1. InitializeParticle → Life/color/MeshScale

        * <img src="./images/UnrealInitializeParticle.png" width="400" /> 

        * ##### 2. ShapeLocation 

        * <img src="./images/UnrealShapeLocation.png" width="400" /> 
        
        * ##### 3.AddVelocity+CurlNoiseForce+PointAttractionForce

        * <img src="./images/UnrealAddVelocity.png" width="400" /> 

        * PointAttractionForce这里设置的目的更强的迸发力，并且一定程度上可以解决卡地面的问题

        * ##### 3.AddRotationVelocity

        * <img src="./images/UnrealRotate.png" width="400" />

        * MeshBounds:在模型可以看到它的bound数值

        * ##### 4.Particle Update → Scale Mesh Size → Gravity → Drag 

        * <img src="./images/UnrealParticleUpdate.png" width="400" /> 

        * ##### 5.Collision → Update Mesh Orientation 

        * 做碰撞设置
        * <img src="./images/UnreaCollison.png" width="400" /> 
        * Bounce 增加这些参数可以使碰撞后的二次变向产生一些随机变化

        * ##### 5.EmissiveControl(DynamicMaterial)

        * <img src="./images/UnrealDynamic.png" width="400" /> 
        

 * 关于为什么之前一直使用g通道
 * R:5 / G:6 / B:5/ A:16
 * <img src="./images/RGB.png" width="400" /> 

### 4.Smoke
    material → particles

* ##### 1.material

* <img src="./images/Smoke.png" width="400" /> 
* 图里RG端口存的是Normal贴图 ，B端口是BaseColor ，A端口是Alpha
* 问：如何重构法线
* 答：sqrt(saturate(1-x^2-y^2)) 对应ue节点（DeriveNormalZ）
* 补充：贴图必须重映射到（-1，1）范围 。图片不能勾选SRGB
* ##### 2.particles
* <img src="./images/SmokeParticles.png" width="400" /> 
* 这里我们要做个中心往四周膨胀翻滚的烟雾
    * 指认贴图 → SubUV 8*8
    * 多个烟雾所以我们使用GPUSIM 
    * <img src="./images/SIM.png" width="400" /> 
    * 出生时候添加随机生命，随机大小，随机Alpha，随机旋转
    * <img src="./images/Pat.png" width="400" /> 
    * Shape Location + add Velcoity
    * <img src="./images/UnrealEditor_fT6w3zOIHO.png" width="400" /> 
    * Particle Update
    * Scale color +Scale Sprite Size  
    * 控制Alpha(消散) +贴图缩放
    * <img src="./images/UnrealScale.png" width="400" /> 
    * Sub UVAnimation 读取贴图动画
    * <img src="./images/UnrealUVAnimation.png" width="400" /> 
    * Drag + Sprite Rotation Rate
    * <img src="./images/UnrealDragRotate.png" width="400" /> 
    * Dynamic Material param + NM Set(复制之前的设置)  + Camera Offset
    * <img src="./images/UnrealEditor_JpOJWRhdIq.png" width="400" /> 

* ### 5.Lightning Down
* <img src="./images/UeLightning.gif" width="400" /> 
* 我们做了四根闪电
    * 1. <img src="./images/UnrealLightning01.png" width="400" /> 
    * 第一根我们用到了B通道的 FadeDistance：25是因为闪电离地面还是有点距离的不需要虚化很大
    * 材质我们还是M_FX_SimpleParticle的实例修改的
    * 发射
    * <img src="./images/UnrealNeLightning.png" width="400" />
    * SpriteRender ->SpawnBurstIn 
    * -> SpriteFacingandAligment(作用让闪电永远对齐z ，在任何视角都是从上而下的)
    * -> SubUVAnimation -> Scale color -> Scale SpriteSize
    * <img src="./images/WAbk4siVjz.png" width="400" />
    * 丰富细节我们在做一份闪电
    * 2. <img src="./images/UnrealEditor_RqaaL0VTkv.png" width="400" /> 
    * 第二根我们用到了G通道的 
    * 复制了一份材质
    * <img src="./images/UnrealEditor_dHaC0Wi37r.png" width="400" />
    * 发射源上我们修改了下大小和saclecolor
    * <img src="./images/UnrealEditor_TWHyg55GI0.png" width="400" />

    * 3. <img src="./images/UnrealEditor_UzfzPtEJta.png" width="400" />
    * 第三根闪电我们替换了贴图
    * 修改了一些参数
    * <img src="./images/UnrealEditor_YM5WSE1BCz.png" width="400" />
    * <img src="./images/UnrealEditor_K0EDOpPHWe.png" width="400" />
    * 4. <img src="./images/UnrealEditor_qhYLKC76Lr.png" width="400" />
    * 第四根加一些不同颜色的闪电
    * <img src="./images/SETUNA_6d4eKuG2Vo.png" width="400" />
    * 问：是否可以合并上面几个发射器呢
    * 答：需要bingding参数实现，可以有效节省CPU的计算，粒子生命ParticleAge不能单独换绑，可以通过控制Alpha实现
    * <img src="./images/1aEIyVsiSw.png" width="400" />
    * 先set -> 在绑定 ->对应设置参数
    * <img src="./images/UnrealEditor_dRzL3Chewq.png" width="400" />

* ### 6.Lightning All
* <img src="./images/UeLightningAll.gif" width="400" />

    ##### NE_Light(爆点) && NE_Rock（不同颜色的rock） && NE_Sparks_Cylinder（消失后的细节）
    * 1.NE_Light
    * <img src="./images/UnrealEditor_Hg9ZuDLa3B.png" width="400" />
    * 2.NE_Rock
    * 首先需要复制不同颜色材质
    * <img src="./images/UnrealEditor_JZnQdWVxvX.png" width="400" />
    * 左侧ParticleAttribute->visibility Tag -> int array 
    * <img src="./images/UnrealEditor_Ll26oN8GDy.png" width="400" /> 
    * NE_Sparks_Cylinder
    * 做一个竖条消散粒子
    * Emitter State (Emitter持续0.2秒) -> Spawn Rate -> initialize Patticle
    * -> Shape Location ->Add Velocity
    * ->Drag ->Curl NoiseForce ->Scale Color ->Scale Sprite Size
    * <img src="./images/UnrealEditor_pm9cKQniKE.png" width="400" /> 
    * <img src="./images/UnrealEditor_T7JaoN0HsK.png" width="400" /> 
    * <img src="./images/UnrealEditor_alRLBuT6IF.png" width="400" /> 
    