
### 1.RustyIron

（只是测试）20240321
![](images/WEBRESOURCE6a65c28157129576e2c1d283b91c52b9mplay_CdRjt8M6Tp.gif)

tip ：
1.提取一堆pack物体的中心点  forech（太蠢了），可以用
上述效果是 pyro+pop 实现的

2. pyro 就一个蘑菇形状，但是他的速度场提取出来看是卷曲的（这里做了下

3.水的效果是添加了 popfliud

![](images/WEBRESOURCE236cef8f743f1c6c9a4c355f36ebe433houdini_QumFO7VdGk_th.jpg) ![](images/WEBRESOURCEb2a5f24bc1228add8b132a3dbf415ce3o7qZJLBNVF_th.jpg)
<img src="./images/WEBRESOURCEb2fe63da62a3529233c3dcedfd06d674image.png" width="300" />
### 2.Hair
一.主要制作内容是：颗粒元素进入微观头发
视频为版本迭代：
![](images/WEBRESOURCE9665cd2e7bd606ac72b320b338b996bd01.gif)

![](images/WEBRESOURCE7570fb063fa3d3873688b7a72265ea4502.gif)
前2视频为粒子进入头发缝隙
具体思路 ：

<mark>画线作为初始ani —— vellum 加sphere动态+hair 动态 ——vdb包裹</mark>
新学到的：
1. volumebound 直接可以获取体积 不用之前一样用volume去做了
<img src="./images/WEBRESOURCE305a2f6419e73a86f9fc87172b3f9f6cimage.png" width="300" />
2. curve路劲动画 extractpointfromcurve自带随机
![](images/WEBRESOURCE7ae5d022290878c3e1cdef5c7ad69c98image.png)

3.解算或者任何ani的,物体进入vellum前需要去掉
思路类:尽量先让自己目前做的东西没bug再去迭代,不然错上加错

<img src="./images/WEBRESOURCEdeec66ff346df13bd2a38a49dc57b56105.gif" width="600" />
<img src="./images/WEBRESOURCE18fa57693d0f94ba3879fd9dcc962e9b06.gif" width="600" />
<img src="./images/hhair.gif" width="600" />
这些效果是,不需要从缝隙进去了(哪里都可以)
一开始尝试了Alpha(不是太好)
思路：

解算了套粒子,往hair聚集(pop curveforce)——copy球做vellum—— 做颜色传递判断sphere 什么时间接触表面——做rip——包裹
新学的节点:

1.relax 设置pscale后可以避免穿插（防止vellum解算有问题）
<img src="./images/WEBRESOURCE622be4577571a7de88a13f7d8cb7ff03image.png" width="300" />
2. 删除粒子时候记得通过id**  避免后续出问题

3.接触变红（一直红）solver 内部求最大(一但.r>0  直接=1 避免颜色出问题  在加个age+1 做累加器)
4.uv 锁住在传递

<a href="/hip_files/CoreRTB-SH030_FX_v0020.hip" target="_blank" download>📦 下载CoreRTB-SH030_FX.hip</a>

增加效果 
二.
1.一开始小球进去的交互是用ripsolver做的(客户觉得太像水了)
2.改方案用displacement 做颜色作为强度
问题：小球一下进去了,那么导致凹陷没过度.      解决： trail +sweep
<img src="./images/WEBRESOURCE754d386bb2caf98ef96f049f18ad6e91image.png" width="200" />
大小球是分开做的,不然导致一blur,小球的影响范围太大.
弊端(不像软体,因为是靠颜色会形变)可以尝试用vellum +restlength+v模拟
三.
噪波偏移
这里有个绕的(世界坐标/物体坐标)
这里需要1&2两种噪波
![](images/WEBRESOURCE43e3a366fc02d6db2779845a02d5711brzPMlS95Hf.png)
方法1.此时控制 x y 的轴向就是对应输入方向上的偏移

方法2.同理用,polyframe求出物体的坐标

v@CurveP=v@P; 线的P sweep 之后  dot 0°,1 / 90°,0 / 180°,-1  /-90°,0
```vex
float x =dot(@P-v@CurveP,v@tangentu);
float y =dot(@P-v@CurveP,v@Nc);
v@My_P=set(x,y,@curveu);
```
方法3.
orientalongcurve 获取曲线矩阵3*3 转置矩阵到物体坐标系(转置矩阵,行列互换)
```vex
vector dp =@P-v@CurveP;
v@My_P=dp*invert(3@tran);
v@My_P.z=@curveu;
```

noise 
![](images/WEBRESOURCE48cef612ad74abc834d5cf170511a271image.png)
<a href="/hip_files/Ofst.hip" target="_blank" download>📦 下载Ofst</a>

<a href="/hip_files/CoreRTB-SH030_FX_v0020_rtk.hip" target="_blank" download>📦 下载HairFinal</a>



### 3.Beer
![](images/WEBRESOURCE49920857f1770538372901be3dfc3ff54.gif)
1.以上用的方法都是用的collisions vel
<img src="./images/WEBRESOURCEd056b8d09286a50d0009c29607a83db7image.png" width="300" />
(但是这会导致隐藏问题,瓶子内部的液体太剧烈,导致穿插等问题)
2.后面切换思路,使用divergence的方法控制爆出来的(可控且效果还可以)
<img src="./images/WEBRESOURCE9a401d0df3c172607e53ec32402ad433houdini_kEvEnqwFS1.png" width="300" />
<mark>tip：需要放在volume vel端口</mark>
<img src="./images/WEBRESOURCE40de1591a3819982e0112eeb58a492e0image.png" width="300" />
divergence：
<img src="./images/WEBRESOURCE0b64a561b54cf27035f244eb047cf6715.gif" width="600" />
3.find droplet part
寻找周围有几个粒子,少的就是独立的
<img src="./images/WEBRESOURCEdb7eb8cdc54e4931349ddb227d1471e8image.png" width="600" />
remove points
<img src="./images/WEBRESOURCE4f79865b618b39f767d74ae3d0c1d693image.png" width="600" />
4.处理妊的问题
<img src="./images/WEBRESOURCE2a4417c3289dd9ec0814795321cfd92ckrtJeylyp4.png" width="400" />
总体原因应该是速度太快导致的,
可以适当减小 CFL Condition

<img src="./images/CFL.png" width="400" />

<img src="./images/WEBRESOURCE81894566104cc6879ddb59e4a1faeeaaimage.png" width="400" />
<img src="./images/WEBRESOURCE10c822ac967e8740b8c6fb078e81b51eimage.png" width="400" />
eg:
<img src="./images/b54317c9693a7802f5ae363f8017c5d5b54317c9693a7802f5ae363f8017c5d5.jpg" width="400" />
<img src="./images/d932f03745fd65fc74402663c5b0d56cd932f03745fd65fc74402663c5b0d56c.jpg" width="400" />
<img src="./images/WEBRESOURCE5bb89abaf6b062d765f387ab50628d2eimage.png" width="400" />
如果粒子半径比例/网格比例 >=sqrt(3)/2,则粒子永远不会解析不足.

<img src="./images/beer.gif" width="400" />
5.修改遮挡关系
<img src="./images/WEBRESOURCEea6b8294949867dcfda159e197c1cd11image.png" width="400" />
<img src="./images/WEBRESOURCEaa466ea67c043f234f6857f1497f75b6image.png" width="400" />
<img src="./images/WEBRESOURCEdd740903f8064a086e70fb093935904cimage.png" width="400" />

6.vel
内外k帧
dop内部k,会导致做白水的时候,获得错误的vel场(导致白水飞出去很多(相对于液体)) , 解决外部k.
7.总结一下遇到的坑
1.瓶子ani动画抖动 + 自己trans(pivot,不能是带动画的！不然抖动加剧)
2.发射源的v和发射源形态很重要
发射源用颜色(颜色每一帧变了+ani)删除
理解：要有那种圆圆的droplet粒子(需要满足,发射源(不能一直一个点发射——会像水柱)有足够的表面张力).
3.pump力
<img src="./images/WEBRESOURCEc0a8b55e5df8adfc75908e58482a3e1dimage.png" width="400" />

<img src="./images/WEBRESOURCEc55d5f91732d99a0f4195f31ac58893dimage.png" width="400" />

<img src="./images/WEBRESOURCEdce5e78ca7c1e3373bcca991008405a3image.png" width="400" />
4.计算速度不能再vdb之后trail
面一直在变速度就有大问题，水下出来的物体照道理(在水下时候一直被水包裹的)不是如此就是有问题,碰撞没选用volume形式.
5.粘性在里面选择时候,需要手动开启
否则不启用.
<img src="./images/WEBRESOURCE2d63767c1efe31920ced400b28798c50image.png" width="400" />

<a href="/hip_files/beer_sim_v032.hip" target="_blank" download>📦 下载BeerFinal</a>

### 4.Sun

要求 reference：
<img src="./images/WEBRESOURCEefe2844a9aee84bcd2366c0c6ba54d39vlc_LB5b8rhBgC.png" width="400" />
方法一.v01:相对简单稀疏的发射源+v@P=minpos(1,@P);+ 旋转力即可
<img src="./images/WEBRESOURCE76623eaeadf806077b35071221951fe8image.png" width="400" />
<img src="./images/sunliens.gif" width="400" />

方法二.v02:总监需求,不完全贴在表面上，有一些起伏的贴着.
1.发射源用了前面做的线做发射源
<img src="./images/WEBRESOURCE31b9b043d8f98758074312b4b1f3a55eimage.png" width="400" />
<img src="./images/WEBRESOURCEef7105837f25dc1a7d4f7909638ce186image.png" width="400" />
<img src="./images/WEBRESOURCE509305c873a3fbe29eb0273250aba64bimage.png" width="400" />
<img src="./images/sunpart.gif" width="400" />
2.太阳纹理
<img src="./images/WEBRESOURCE71934037b2a743271e2abdaf783d97bdimage.png" width="400" />
<a href="/hip_files/sunMagic2.hip" target="_blank" download>📦 下载sunMagic</a>

二.关于镜头
shot的相机运动巨快(所以需要做太阳左右移动，我们最好去掉相机运动(物体p给相机))

2种方法得到相机动画
- 1.把相机导出fbx
- 2.mops bake Cam
eg：
<img src="./images/WEBRESOURCE4c92363075e9acf96ec798f7babad31bimage.png" width="400" />
<img src="./images/WEBRESOURCEf6dcd3591bf8a86f27cede175e0e9d3bimage.png" width="400" />
三.  太阳(出现动画)

<img src="./images/sunstara.gif" width="400" />
2种形态做了blendshape+mask+carve
two shapes：
<img src="./images/WEBRESOURCE9d8316d0efc169049cc3b5231c0f3b74image.png" width="400" />
mask:
<img src="./images/WEBRESOURCE687f932088e6c48dcf47e7c49f1c1edfimage.png" width="400" />

<a href="/hip_files/Sh_430_sunlines_1001_1024_v006.hip" target="_blank" download>📦 下载sunlines</a>

<a href="/hip_files/sunMagic1_Rt2_v10.hip" target="_blank" download>📦 下载sunlinesCam</a>

### 5.FireWork
work(left)——ref(right)
<img src="./images/WEBRESOURCEce0cbebd066509fe9f2a9f8bb08534deimage.png" width="600" />
<img src="./images/fireWorks.gif"
width="600" />


参考：
<img src="./images/WEBRESOURCEb3e4eefcc086df5b8e9f5cf6435becadimage.png" width="600" />
<a href="/hip_files/firework_testinshot_v006.hip" target="_blank" download>📦 下载firework_testinshot</a>

<a href="/pureRef/Fire.pur" target="_blank" download>📦 下载FireWorkRef</a>

制作：
<img src="./images/WEBRESOURCEa2e58054837130aa598addbf9d44f851image.png" width="600" />

<img src="./images/WEBRESOURCE5f9a91c2f4f549057ffdec01669a50c4image.png" width="600" />

<img src="./images/WEBRESOURCEabc6c0dbb85c4d32f32b18a93cdd5217image.png" width="600" />

渲染cryptmat
<img src="./images/WEBRESOURCEad61ecbd799ae9c51466c85716f8780eimage.png" width="600" />

<img src="./images/WEBRESOURCE8aa29608e926597e035b9ce356e9531dfirework.gif" width="600" />

### 6.SKII
<img src="./images/WEBRESOURCE8fd8223039fa23e43ceb4fb4e7dff83bimage.png" width="600" />

<img src="./images/soft.gif" width="600" />

### 7.BilBilParticles
效果：
<img src="./images/WEBRESOURCE5247efbfcb7e2dfa3a2efdc2655502c9image.png" width="400" />
layer:
- 1.蓝色线/ 黄色线
- 2.粒子/蓝黄
- 3.01 数字

1.线
sweep——mask(ani)——blendshape——Cd+width+shine
黄线就是,范围大一些,数量小一些
<img src="./images/WEBRESOURCEbf8fbf5dd4ecf9118276450a1aaa2a93image.png" width="400" />

<img src="./images/WEBRESOURCE2acc446823f6c59f6a033f5a7975a60dimage.png" width="400" />
2.  粒子略
3.01数字
在线上撒点——定义法线朝向摄像机——拷贝01
<img src="./images/WEBRESOURCE810bf11235adacebe263ac0ee30564adimage.png" width="400" />

<a href="/hip_files/BilBil_line_Note.hip" target="_blank" download>📦 下载BilBil_line_Note.hip</a>

### 8.Nebula
如何渲染成这样：
<img src="./images/WEBRESOURCE0915675154e31a6866837c9c9d640557image.png" width="400" />
smoke color ——Absorption color （吸收光）——Shadow color
3个搭配着来的(也和光有关(eg：阴影的位置))
<img src="./images/WEBRESOURCE66c24dacbc030be65a4b4e4287a1072eimage.png" width="400" />

### 9.Loreal
效果：
<img src="./images/WEBRESOURCE6c765cb381167373352e3f81f4d95228bubbles.gif" width="400" />
如何让液体有小水珠：
主要是发射源的处理上
<img src="./images/WEBRESOURCEbf629bf63f4a57592123ac084e33f2b5image.png" width="400" />
在基础的发射源上加了一层小球(发射)：
tip:注意如果面在动直接撒点会导致,撒点一直在变(影响发射出来的水珠也是突然出现的)需要处理

解算器没做其他处理
<img src="./images/WEBRESOURCE61400cc1b0bca1f90163896693bb4e4bimage.png" width="400" />
<a href="/hip_files/SH020_MoleculeAbsorbed_Note.hip" target="_blank" download>📦 下载MoleculeAbsorbed.hip</a>

### 10.Add rip
<a href="/hip_files/Add_rip.hip" target="_blank" download>📦 下载Add_rip.hip</a>

### 11.Crystal
1.tip：
自动展uv,auto uv在选择内部面展时候,会生成新的点(影响后续制作)
uvunwrap 则没这个问题
<img src="./images/WEBRESOURCE1bc7c53fef7fb13ece4f3cae890ae14aimage.png" width="400" />

<img src="./images/WEBRESOURCE22d21f4fe41c158b98a4e2f7cba714ffimage.png" width="400" />

<img src="./images/WEBRESOURCE42f99489e0048054bbae07f04bfb8d55image.png" width="400" />

<img src="./images/WEBRESOURCE27e8b291c293d4ef83bd84bd2cd04a44image.png" width="400" />
<a href="/hip_files/Crystal_.hip" target="_blank" download>📦 下载Crystal_.hip</a>

2.mountain勾选>accumlate lattice Warp   , acccumulate Warp会生成条状纹理

3.crystal  生长(kinfx)
<img src="./images/WEBRESOURCEc7a02db6eb6ef0cfa26ca5c89b60478fgrowth.gif" width="400" />
<a href="/hip_files/Crystal_growth.hip" target="_blank" download>📦 下载Crystal_growth.hip</a>

<a href="/hip_files/Crystal_all.hip" target="_blank" download>📦 下载Crystal_all.hip</a>

### 12.Teeth
破碎牙齿缩放 直接用primitive导致,旋转之后影响 法线(法线错误的)
错误图:
<img src="./images/WEBRESOURCE101214a1f9e8a43e38bb7a9c511bf0d3image.png" width="400" />
正确:
<img src="./images/WEBRESOURCE1246d1ef3cf4d33bc2394a7d4539a51aimage.png" width="400" />
如何解决更换缩放方式
用vop,四元数-矩阵-xform,都可以
<img src="./images/WEBRESOURCE964e75472a22391d999d4b0feae11195image.png" width="400" />

<img src="./images/WEBRESOURCE21ff4dcd6afc4e7849ec1df28f217267image.png" width="400" />
<a href="/hip_files/SENSODYNE_20322_tooth_v002.hip" target="_blank" download>📦 下载tooth.hip</a>

### 13.BubbleFollow Ani
要求：
- 1.球一开始在相机中央
- 2.随着球下落在zoom out 出来
<img src="./images/WEBRESOURCEa781acca42f52cfcc3494e03deb7a470BallFollow.gif" width="400" />
方法：
求了2根线   
- 1.球的运动轨距
- 2.相机运动轨迹
<img src="./images/WEBRESOURCE74741e3b7768c3fc18c005295a94cde7image.png" width="400" />


<img src="./images/WEBRESOURCE5c4a066505734d3b3e291a5cc2cf3ee6image.png" width="400" />
Line:

point('/obj/Cam_curveu_path/Out_carvePt',0,'P',0)
<img src="./images/WEBRESOURCEa77ae91b49ca2dc859e7d1733b26c5a8image.png" width="1200" />
Sphere_lookat:

point('/obj/Sphere/Out_ptPosition',0,'P',0)
<img src="./images/WEBRESOURCE3e6595df5102da89bba18fc72c75fb94image.png" width="1200" />

### 14.Loreal liquid
BUBBLE在物体内部时候(理论上法线应该是负的,所以reverse在渲染)

动画变速很重要(会有个故事性)
<img src="./images/WEBRESOURCEd6ce70ffa2920d526239d5e68a762890image.png" width="400" />

Final render test

<img src="./images/liquid.gif" width="400" />

<img src="./images/WEBRESOURCEf4f8741c382ad93cf3c0df91710c25b91.gif" width="400" />

<a href="/hip_files/Product Porn-SH180_FX_v0008.hip" target="_blank" download>📦 下载liquid.hip</a>

### 15.Unicore Hair

无uv如何提取模型中心线(可能特定模型)
<a href="/hip_files/Unicore_hari_vfx_v001.hip" target="_blank" download>📦 下载Unicore_hari.hip</a>

<img src="./images/WEBRESOURCE339385062bca037177a40196b319c8c9image.png" width="400" />

~~20250612我们测试这个Guideprocess 如果在clump上面（2个之间）会导致毛发闪,~~
~~看了官方文件也是如此 process是在clamp之后的//问题出现在 guide之后的(动态模型)~~
<img src="./images/WEBRESOURCE0a5b9d1bcdc0e2eaab214739ab736f81image.png" width="400" />
~~20250613更新是,现在理解大概因为加上process,skinprimuv 会变 (但是看官方也变,每一帧都在变,待理解)~~

~~然后clump 需要加上动态的skin,才能保证skinprimuv 变化小一些(小数点后四位)(拍屏 看不出来明显问题.)~~

<img src="./images/WEBRESOURCEa5001eda40261c08a39ebabaa8a9e4e1image.png" width="400" />

~~20251125clamp前不能加bend(待定)会改变朝向导致clamp识别不到 具体方向~~

很硬(测试阶段)(好像看不出来抖动)
<img src="./images/WEBRESOURCE215f6588565200bdcba1227b96198b1dhorse.gif" width="400" />

<img src="./images/WEBRESOURCEadf8f5c73e884c7a4c996c9bb54e6904horse_feet.gif" width="400" />

后面问了ai 
行业标准流程(静态生成+解驱动算)
为了彻底杜绝毛发,所有的生成(HairGenerate)和成簇（HairClump）操作,依然必须在静止(Rest)状态下完成.然后用你解算出来的指南去驱动这些干净的稀疏毛发

workflow:   刷毛——高精度毛发     

sim的毛发一定是guide驱动的.sim完后在去驱动高精度毛发.

<a href="/hip_files/Unicore_.hip" target="_blank" download>📦 下载Unicore_.hip</a>

### 16.CombineBall
这个项目最后没有用cg(没有还原的很好)尝试了很多方法这个为落版的办法

此为ai参考:
[kling_20251103_图生视频_两颗分子球向中间快速_106_0.mp4](attachments/WEBRESOURCEf63e2f5b2aec229fbe5078902b557062kling_20251103_图生视频_两颗分子球向中间快速_106_0.mp4)

此为和gu老师出的效果
<img src="./images/Combine.gif" width="400" />

记录下方法:核心,相机投射(ai的效果)上色——sim
(前提相机没有啥大运动旋转啊之类的)
<img src="./images/WEBRESOURCE194c2e4ca0b35574847070f86d0b0e10ball_comb.gif" width="400" />

- 1.相机投射一张图
- 2.球去对大小
- 3.uvtexture(from cam)
- 4.Attribformmap
- 5.还原大小
- 6.通过颜色给上density做解算
图片可以用cop做一下简单处理(op：读取)
<img src="./images/WEBRESOURCE6f6b62fd325597cbf9d455629d2714f8image.png" width="400" />
<img src="./images/WEBRESOURCE52b687cad8bc679c692cd472057cafc7image.png" width="400" />
ps：右边因为是油球 mesh需要尽可能简单丝滑(gu老师在渲染时候又单独在内部塞了2小球做折射用)

关于客户想要边上是凹凸不平的落版方法:解算完后,用黑白挤出

<a href="/hip_files/Comb_ball.hip" target="_blank" download>📦 下载Comb_ball.hip</a>

~~过程中有想做一个凹凸不平的外壳做碰撞体~~

<img src="./images/WEBRESOURCEd0f336ffe6eeb3b3371994b81495683bball_coll.gif" width="400" />

方法：球表面做一堆粒子——连成线——体积场——vdbadvect

<a href="/hip_files/AdvectBall.hip" target="_blank" download>📦 下载AdvectBall.hip</a>

<img src="./images/WEBRESOURCE89a5e71130b2b48d1441928f996444e2mask_high.png" width="400" />
<img src="./images/WEBRESOURCEd17cedff3ddbef11e147b2f4176f8c98mask_test.png" width="400" />
<img src="./images/WEBRESOURCEf5563980353d5a6729b73e8439519e53mask_test_color.png" width="400" />

### 17.Eyelines
<img src="./images/WEBRESOURCEa07198e490b8cb68c7b5b957dd0fd571sky.gif" width="400" />

新增了一些bilbil上面没有的效果
类似 线开头carve，glow

<a href="/hip_files/Eye_lines.hip" target="_blank" download>📦 下载Eye_lines.hip</a>

### 18.WaterTunnel
1.摆正模型
<img src="./images/WEBRESOURCEee9d7cfe4ce0ad2dd9ad6bc65a63474eimage.png" width="400" />

摆正模型——上wave置换（方便理解方向）——path deform(需要它的旋转)
<img src="./images/WEBRESOURCE393a1e221f610c28fd1f2e85c6a9a953image.png" width="400" />

<a href="/hda/sopflatten_model.1.0.hda" target="_blank" download>📦 下载sopflatten_model.1.0.hda</a>

2.闪电

<img src="./images/WEBRESOURCE830039d0e6ff7169cac54fd009c17ef2LIGHTNI.gif" width="400" />
3.Final

<img src="./images/WaterTunnel.gif" width="400" />

<a href="/hip_files/WaterTunnel-SH010_FX_ben_v001.hip" target="_blank" download>📦 下载WaterTunnel.hip</a>



### 19.Clouds
主要是做粒子instance
orient(自定义更好控制轴向)

<img src="./images/WEBRESOURCE733f6ac72c848d593202fe92f4242a1bimage.png" width="400" />
instance用法

<img src="./images/WEBRESOURCE7ba70af64393d41548eb7866e237e8e3image.png" width="400" />
pyrobakevolume看的最终结果(默认参数)就是渲染结果,加浓需要volumewrang:density*别用老的输出结果会不一样.

<img src="./images/WEBRESOURCE6f3a5bcc36d25c95715af34d9cfa9a64image.png" width="400" />

拓展instance用法:
instance 有助于加快替代
- 方法：他需要一个字符串属性(instancepath)一般用wrangle节点自定义出 s@instancepath='要替代物体的cache路径'
- geo 下的instance
- - 1. 如果是houdini中的路劲直接引入,需要@instancepath=op：obj/**/**
- - 2. 磁盘缓存   @instancepath='磁盘路径'

<img src="./images/WEBRESOURCEc81617ddaf497f86b2316d478ecdfbfdimage.png" width="400" />

- obj 下的instance  
- - 1. 只能识别obj层级的物体>>>>>>/obj/sphere   
- - 2. 这里识别的是instance(属性)  只需要 /obj/sphere 


### 20.20350-anessa-y27   Cloth
- 一个布料的测试  要求是很轻丝绸布料

- <img src="./images/Cloth_sim_v01.gif" width="400" />

- <img src="./images/Cloth_sim_v02.gif" width="400" />

- 我制作的只考虑质感了存在一个问题就是没有破一个大型。在后续测试中修改。（其实有测试，认为最好的办法就是在结算前凹出来）
- 关于试图材质显示的话需要自己打光，用自带的出不来透明的感觉
<a href="/hip_files/ccloth.hip" target="_blank" download>📦 下载ccloth.hip</a>

### 21.20346-belotero-revive
1.
- 如何做这样的一个模型（一边扭一边光滑）

- <img src="./images/circle.png" width="400" />

- 如果你直接2模型融合vdbcombine，是可以的但是后面处理uv就麻烦很多
- sweep直接blendshape 会显示拓扑不一样，最好的办法就是第二段接入circle（01圆 02三角）
- <img src="./images/houdini_bSsvfWYEOU.png" width="400" />


1.1
- 如何加一些流动的褶皱呢

- 这里考虑uv断层的问题
- <img src="./images/houdini_fGuM5qJAIH.png" width="400" />

- 在图形学和 Houdini 中被称为 “三角函数圆周投影法”（或 升维无缝映射法 / Cylindrical/Toroidal Mapping）。
- 它主要是用来解决圆柱体、管道或旋转体在 UV 展开接缝处（即 U=0与 U=1的边界）产生的贴图/噪声突变与断层问题。
- <img src="./images/houdini_YCuVxUNiGC.png" width="400" />
<a href="/hip_files/Product_Video-SH110_FX_v0001.hip" target="_blank" download>📦 下载Product_Video-SH110_FX_v0001.hip</a>

渲染合成效果：
- <img src="./images/Infinity_Loop_styleframe_v06.png" width="400" />
2.
- Bubbles
- <img src="./images/Bubbles_v01.gif" width="400" />
<a href="/hip_files/Product_Video-SH060_FX_v0006.hip" target="_blank" download>📦 下载Product_Video-SH060_FX_v0006.hip</a>

3.如何补前置动画
获取的maya的abc没前置动画，我们可以用chop的extend-slope补
trim是用来调动画区域的（因为存在前置动画k0的一slope全平了）Tip：他的star-end 不是Frame！！
extract 可以获取物体的旋转缩放

- <img src="./images/houdini_HJvR2hoJcF.png" width="400" />

* 当然除了图中的办法 还有可以用transform读取（前提是给他归中心）
chop("../chopnet1/output0/tx0")/chop("../chopnet1/output0/ty0")/chop("../chopnet1/output0/tz0")

*  这样你可以一键烘焙成“可自由编辑的贝塞尔关键帧”（关键！）
选中这个 Transform SOP 的 Translate 参数。
在参数标签 Translate 上 右键 -> Channels and Keyframes -> Bake Keyframe Representation（或按 Alt + E 打开动画编辑器全选右键 Bake）。

- <img src="./images/rtBubbles.gif" width="400" />

* 主要记录下线的生成
* 提前设置了个land_age属性（触发器） 提前connectadjacentpieces - 用landage触发（什么时候生成）- 用curveu补充细节 - copy多根线条做noise 再加细节

<a href="/hip_files/Product_Video-SH090_FX_v0003.hip" target="_blank" download>📦 下载Product_Video-SH090_FX_v0003.hip</a>
- <img src="./images/Pump.gif" width="400" />

