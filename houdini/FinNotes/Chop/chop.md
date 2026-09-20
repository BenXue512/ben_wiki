## Chop

学习地址：

[https://www.bilibili.com/video/BV1EJ4m1j77C/?vd_source=044ee2998086c02fedb124921a28c963](https://www.bilibili.com/video/BV1EJ4m1j77C/?vd_source=044ee2998086c02fedb124921a28c963)

- 1. #### class Flow
主要节点: 

 chopnet     channel   geometry

<img src="./images/WEBRESOURCE702bea856f6834c863200d21d5fbb0acimage.png" width="300" />

geometry ：                                                                                 

<img src="./images/WEBRESOURCEbdf37b9eabd74295a53e9627d9b9e5e5image.png" width="300" />

channel：

<img src="./images/WEBRESOURCE31497bf408df0cb1de7ff3d45228266fimage.png" width="300" />

+载入   ×删除  动画曲线

<img src="./images/WEBRESOURCEf2fdef0bf34d74f94621d5302a155531image.png" width="600" />

***做循环动画非常好用***

<img src="./images/WEBRESOURCE4249a7a04242692d4f7b4bb622c5cf3bimage.png" width="600" />

有趣的ani

<img src="./images/WEBRESOURCEdade318055900f03d8a04b0c1ebadebcimage.png" width="300" />

控制属性的ani
eg:设置glow

<img src="./images/WEBRESOURCE2052f3e8cee189ff1a49d67df20f669aimage.png" width="600" />
读取glow
<img src="./images/WEBRESOURCE3e33f9a1fca3a602c54f900dd7da7e5eimage.png" width="300" />

<img src="./images//WEBRESOURCE44ac5d75219fa0faeb1dd63e659e580aimage.png" width="300" />


<mark>tip ：jiggle 是无法针对属性的 只能对物体</mark>

<img src="./images/WEBRESOURCE8d7d7d95dde9abbf91d99fe530c440aeimage.png" width="600" />
<img src="./images/WEBRESOURCE5451787eba0bce58497e4033dca97dd9image.png" width="600" />
<img src="./images/WEBRESOURCE45ef94fb4fad69d79614048ed635fdc3growth.gif" width="600" />


<a href="/hip_files/HS_EXPERIMENTAL MOTION_SESSION1_MASTER_01.hiplc" target="_blank" download>📦 下载MOTION_SESSION1_MASTER_01.hiplc</a>

- 2. #### Extend ani
- - 方法1：chop：
1.extractcentroid 获得物体中心(因为直接进入chop,每个点动画都会进入)

<img src="./images/WEBRESOURCE8d120041ff4afe949691b0fe3931b0b1image.png" width="600" />
extend——slop 动画

<mark>trim：往前搓一点帧数 因为直接slop它只是曲线slop数值并没有获得</mark>

<img src="./images/WEBRESOURCEd64103920753b5b5974a64b5278be4e2image.png" width="300" />

不是channels模式(他会合并输出的)

加上动画

chop("/obj/FX/chopnet1/null1/tx0")

<img src="./images/WEBRESOURCEfc8105f5773c8552d56968d441dab1afimage.png" width="600" />

- - 方法2
abc这样输出出来是带动画数据的
他是带动画数据的 只需要在下面加个cam bake出来就可以获得

<img src="./images/WEBRESOURCE8929c0fc4ac3f0e376f59fc2d4c7b816image.png" width="600" />
<img src="./images/WEBRESOURCEacdae0079cbd49af701c14531f129cc7image.png" width="600" />
<img src="./images/WEBRESOURCE2fcb6bdc6bf4b2d0f1d77f959e446784image.png" width="600" />


<a href="/hip_files/2026206.rar" target="_blank" download>📦 下载2026206.rar</a>