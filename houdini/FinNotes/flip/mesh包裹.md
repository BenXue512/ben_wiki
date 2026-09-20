学习出处：[https://www.youtube.com/watch?v=3OGGFZS1R3Y&t=1436s](https://www.youtube.com/watch?v=3OGGFZS1R3Y&t=1436s)

[product_splash.v6.hiplc](attachments/WEBRESOURCEbf87b30356381a73ec3baf7309b2d5c5product_splash.v6.hiplc)

1.

光滑平面：用曲率方式 提取出运动快的作为mask

abs_curvature： f@density = abs(f@density);

remap_curvature：f@density = fit(f@density, 8.0, 28.5, 0, 1);

![](images/WEBRESOURCEf42b8a9dd1e472fced6611a454ec8014image.png)

2.水下那层光滑的莫

自己弄了个体积场模糊的

![](images/WEBRESOURCE3b7d7c6cf0282442a5bbf32126e4aaceimage.png)

3.可以提取出很远的那些粒子（细节）单独mesh

i@group_keep = volumesample(1,0,@P)*10>0.005;

![](images/WEBRESOURCE4f0ed859bb49cfd3fc7f35bf48c4419eimage.png)

![](images/WEBRESOURCE4793dcbf91234de91a5b9fa119b72524image.png)