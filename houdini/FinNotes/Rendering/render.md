# Render

### Redshift

* ### 1.关于代理 h to maya

* #### **1. 代理设置**
    * 1.输出粒子的话需要勾上`pscale` 属性,否则在 Maya中无法正确识别。

    * <img src="./images/WEBRESOURCEc7966668c73fe657fce99fa5eb7d0be5image.png" width="300" />

    * 2.输出的属性必须在`顶点上`

    * 3.输出时(下图)必须去掉不然会把属性删除

    * <img src="./images/WEBRESOURCEc7e767b2474603b2b2916ab72515db64image.png" width="300" />
    
    * 4.不要保留灯光(影响渲染)
    * <img src="./images/WEBRESOURCE31217c5cc3173a65af7004436cb0264bimage.png" width="300" />

    * 5.速度不要在顶点上,代理可直接渲染运动模糊
    * <img src="./images/WEBRESOURCE7cbb7aa7aa5611555ed8b96aa0959a6bimage.png" width="300" />
    * <img src="./images/WEBRESOURCE50696753baaa0481338c3dd6a9dccc6eimage.png" width="300" />


    * 6.如何让maya渲染可以加细分
    * <img src="./images/WEBRESOURCE2b1a7d7161a0d1178a037608b2cc32c9image.png" width="300" />
* #### **2. deep渲染**
     * <img src="./images/WEBRESOURCEc813a74591776cc89d199c851b3d089eimage.png" width="300" />

* #### **3. 遮罩**
    * 我们需要创建个null 
     * <img src="./images/WEBRESOURCEe0d8386141dcc58c00c20afea6c75cffimage.png" width="300" />

     tip:这个null2一定要`手动`指,不然认不到  
     * <img src="./images/WEBRESOURCEf5da827c86232c9e3f46f6649c428907image.png" width="300" />
* #### **4. aov输出**
    * 材质,aov这里(下图)取的名字才是真正的属性输出的名字
     * <img src="./images/WEBRESOURCEf2f56278909864f340312cd640427bacimage.png" width="300" />
    * rop指认属性
    * <img src="./images/WEBRESOURCE7b8e6b11f094301052f49a7635552ba6image.png" width="300" />

* #### **5.crptomatte**
    * tip:如果渲染的是线,勾了外面的,会丢失给的shopmaterial_path,导致渲染不出来属性
     * <img src="./images/WEBRESOURCEf2b9447a726765bb39a2616f27462a1aimage.png" width="300" />
    * 其他(物体)渲染crptomatte
    * 赋予属性 
    ```vex
    s@shop_materialpath='lines_'+itoa(i@class);
    ```
    * <img src="./images/WEBRESOURCEadd2304c210000754af261787682b93fimage.png" width="300" />
    * <img src="./images/WEBRESOURCE23f1e2710e2cb969e9964828f0701b61image.png" width="300" />
* #### **6.灯光**
    * redshift的灯读不到rat的环境贴图
* #### **7.自检**
    * Proxy输出后(在houdini)自检
    * 创建geo,在geo中需要有个redshift_proxySOP,读取缓存(选择显示方式),给材质(输入要检测的属性直接连接,渲染)
    * <img src="./images/WEBRESOURCE5a94bc731496dc6a71f581851b2d1fabimage.png" width="300" />
    * <img src="./images/WEBRESOURCE8a634790c3718b84ac2bf5c1ffca8399image.png" width="300" />

### Karama
* #### **1.基础**
    * 1.显示渲染参数：
    * <img src="./images/WEBRESOURCEffb6d4330190ebfd3396262653666617image.png" width="300" />
    * 2.灯光(指定哪里有高光)
    * <img src="./images/WEBRESOURCEd6fbd6305afec285ba89a7df18fc1348image.png" width="300" />    
    * 3.关于材质的输入输出
    * 输入
    * <img src="./images/WEBRESOURCEd5ef4a10d92ce76613263a0c1802fe67chrome_CYITOkQP66.png" width="300" />      
    * 输出
    * <img src="./images/WEBRESOURCEb562f7c6cf0f636c9b75d76a743c3e8cimage.png" width="300" /> 
    * 4.法线贴图(帮助文档中建议)
    * 1.vector3（保持他原来属性）
    * 2.转换到0-1(tangent模式)  
    * <img src="./images/WEBRESOURCE221f9b71067a763739aad409a7d44dd9image.png" width="300" />
    * <img src="./images/WEBRESOURCE152932a2e36084972f8b393024605eb7image.png" width="300" />
    * 5.单独属性控制
    * Principled Shader ：materialVanation
    * <img src="./images/WEBRESOURCEb9573fb2190a3d6eacd40f1b36c3c73aimage.png" width="300" />
    * 6.mtx
    * <img src="./images/WEBRESOURCE464dad4da184acbfc483c20dffa34cf3image.png" width="300" />
    * <img src="./images/WEBRESOURCE4c06619c85f9c7fb808e55008da76f61image.png" width="300" />
    * <img src="./images/WEBRESOURCEd5c26a49159c6844cd7975e5c87dbdd4image.png" width="300" />
    * 点击create 

* #### **2.运动模糊层**
    * 1.渲染物体本身需要有v
    * 2.物体需要打开Velocity Blur 
    * <img src="./images/WEBRESOURCEefb093da404c75fecde7558c640944dcimage.png" width="300" />
    * 3.目前只有cpu支持渲染速度层
    * <img src="./images/WEBRESOURCE2c1398a16cd0d3d471ae9dd9c69849d2image.png" width="300" />
    * 4.勾选输出(P,Depth同理)
    * <img src="./images/WEBRESOURCE79708d0fae2312ef8d92832635d09b8bimage.png" width="300" />
* #### **3.自定义层如何输出**
    * 1.(不像之前那么复杂)只需要物体处定义一个属性
    * 2.属性需要再输出时候同步
    * <img src="./images/WEBRESOURCE436cf2c854daeaa5073254c8e7dba3aeimage.png" width="300" />    
    * Alpha不知道为啥渲染不出,可能自带属性渲染规则不一样?我给到mask,渲染了个mask解决
* #### **4.物体id层怎么分**
    * <img src="./images/WEBRESOURCE259fdf37b6814ac6e85def28bed68570image.png" width="300" /> 
    * <img src="./images/WEBRESOURCEf6cbec6d2d9feb352aba3c4663307c1dimage.png" width="200" /> 
    根据同一个材质分
* #### **5.实践**
    * 1.水渲染出现黑色
    * 原因：和最大折射次数有关,他不够卡在中间就显示黑色了
    * <img src="./images/WEBRESOURCE8eb2bbd521f9cf9a428909efd2ba844fchrome_8xMDGL7Ab6.jpg" width="300" /> 
    * refraction Limit 1
    * <img src="./images/WEBRESOURCE7e3bdfaaf18eb8cedebaa54da121feb5chrome_4LQ0545CQ7.jpg" width="300" /> 
    * refraction Limit 4
    * <img src="./images/WEBRESOURCEa182ffd629d3d6b21eee63da28edb561chrome_nTzFu9khYM.png" width="300" /> 
    * refraction Limit 10
    * <img src="./images/WEBRESOURCEfb449af6498299ff262b74ab86a10d38chrome_UHFiHB2PUr.jpg" width="300" /> 
    * 2.motionBlur
    * mesh之后没速度了,可以在粒子的时候计算(使用id)
    * <img src="./images/WEBRESOURCEdb1fb062ab1c2ae14c55ec3e1e4fc391chrome_mSac7PgIxi.png" width="300" /> 
    * 加速度表示运动的状态(更加整体,不会太考虑单独那个粒子怎么样的速度)
    * <img src="./images/WEBRESOURCEb4bb0304665169e3fd46fa2382ca927echrome_2dey8XQLB3.png" width="300" /> 
    * 直接用速度渲染的运动模糊边缘会有问题(当然可以删除边缘粒子解决)
    * <img src="./images/WEBRESOURCEaebc86f4802d95551b3407cea4b36c6bimage.png" width="300" />   
    * 换为加速度渲染运动模糊
    * <img src="./images/WEBRESOURCEf59466a6a9d3a33e422914db2d24fac1chrome_wiSwenLT7a.png" width="300" />    
    * 还有一些瑕疵,和相机有关,减慢快门速度
    * <img src="./images/WEBRESOURCE8b69ba45c327e52814111256462981a9chrome_I3CFzhj8xt.jpg" width="300" />    
* #### **6.class**
    * class:[[https://www.bilibili.com/video/BV1sAFNejE6b/?spm_id_from=333.999.0.0&vd_source=044ee2998086c02fedb124921a28c963](https://www.bilibili.com/video/BV1sAFNejE6b/?spm_id_from=333.999.0.0&vd_source=044ee2998086c02fedb124921a28c963)]
    * 液体的吸收光能力：
    * <img src="./images/WEBRESOURCE073b738c84ce449fe118dd1d3794632bimage.png" width="600" />   
    * <img src="./images/WEBRESOURCE7d07e30f8e20ff143130a2c8d2590480image.png" width="600" />   
    * 材质混合
    * <img src="./images/WEBRESOURCE4df0d897f30ea739890c82addd0c6d80image.png" width="600" /> 
    * 单独渲染透明物体
    * <img src="./images/WEBRESOURCE0a344b5100492a5a9f867e884788aad2image.png" width="600" /> 
    * <img src="./images/WEBRESOURCE76143b6b9bcd25da7ca30b288fedf726image.png" width="600" /> 
    * 圆滑边界
    * <img src="./images/WEBRESOURCE07a9bd07b8be782db9ce5f0f7ac6a88bimage.png" width="600" /> 
    属性传递
    * <img src="./images/WEBRESOURCE46070d9237553c16fa4edca350868136image.png" width="600" /> 
       
     