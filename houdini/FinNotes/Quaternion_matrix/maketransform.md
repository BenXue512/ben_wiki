matrix3 

matrix3 

matrix 

matrix 

matrix 

matrix 

matrix 

matrix 

1.3*3    

![](images/WEBRESOURCE023db18a9debbb5851c68de5da39d98aimage.png)

 2.

matrix 

多个tran    4*4

3.

![](images/WEBRESOURCE0967a4f186c2b4761b84bf15e3cf4763image.png)

xyz 顺序 默认就是0

![](images/WEBRESOURCEd627e1d541d2f78e04a70a37196b96b2image.png)

4.

![](images/WEBRESOURCEcdd1f09213969efedff0206179749859image.png)

初始位置需要和轴心位置 一样否则不会自转

5.  matrix 

 需要欧拉角基于xyz   >>>>> 但是实际运用中 不一定是在xyz轴

![](images/WEBRESOURCE28c446cc377f2e80cb8efcfc5b15efc3image.png)

让物体 向011转》》》》 rot 四元数转欧拉角  

maketransform 需要角度

基于轴心的 所以并不会改变物体 》》》 如果需要绕着0 1 0朝上旋转手动转下物体   @P=qrotate（rot,@P);

![](images/WEBRESOURCEb98cf2234e0da880347aeb83cdff5f83image.png)

圆环效果

![](images/WEBRESOURCE4ff8d22fd909439b355552ca0cf54ad8image.png)

旋转是错误的

![](images/WEBRESOURCEc553056ad2009b7aeb04245a1137df5bimage.png)

![](images/WEBRESOURCE01edc561b10af9b870038c29d7ab2b8cimage.png)

重新排序  

![](images/WEBRESOURCE6a4358370d6a29ffbeb98ba0ddf5c1dbimage.png)