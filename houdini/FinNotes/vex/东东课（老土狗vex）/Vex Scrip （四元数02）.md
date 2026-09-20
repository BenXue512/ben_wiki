![](images/WEBRESOURCE8e05b145f8e0888d8053488bf7f45ea5image.png)

 

![](images/WEBRESOURCE7fe0e8f2618c89068f2f2d242f9e545dimage.png)

![](images/WEBRESOURCE42322a4a8227a6fc96ef0f2f9abff1dcimage.png)

![](images/WEBRESOURCEa2d1ec90bb1e57b6cd55582b8ce2038cimage.png)

![](images/WEBRESOURCE8d3da22b4fbd8e5fb7305c5689b39476image.png)

![](images/WEBRESOURCE5b44b019d3cf7887fe8c817f61c48f21image.png)

四元数转换

![](images/WEBRESOURCEa79aebc226b83f19102ddee3760acdd5image.png)

![](images/WEBRESOURCE93ad1acc7181142df5477808b9bc25b3image.png)

![](images/WEBRESOURCE8f86d47de01034da1bf6c3e5e1d1eacaimage.png)

![](images/WEBRESOURCEb1301e7164b3be02af104f215f92eb8dimage.png)

案例卷曲：

分析

![](images/WEBRESOURCEda9e398d90e216e8d8aa28081e1ba916image.png)

过程稿1.

```python
float angle=radians(chf('angle'));
vector zhou={0,1,0};

//数组变量 p
vector myp[];

for(int k=0;k<@numpt;k++) {
    vector pose=point(0,'P',k);
    append(myp,pose);
    //printf("%s\n",myp);
    
    
    }
//大循环确定旋转中心

for(int t=0;t<@numpt;t++){    
    //1.读取旋转中心位置 
    vector xin =myp[t];
    
    
    
    
    //2.构建以此为中心的旋转规则（四元数）
    vector4 rot=quaternion(angle,zhou);
    
    
    //小循环。针对当前中心点，依次转动它后面的每个点
    for(int h=t+1;h<@numpt;h++){
        //读取旋转点的位置
        vector startp=myp[h];
        //归中心
        vector movep=startp-xin;
        //旋转
        vector rotatep=qrotate(rot,movep);
        //复位
        vector finalp=rotatep+xin;
        
        
        //把这个点写入、更新数组
        myp[h]=finalp;
     }
 
// //最后 把数组中最后的各点位置，给到对应每个点的位置p
 
     setpointattrib(0,'P',t,myp[t],'set');
 
 }
  

```

![](images/WEBRESOURCE942e2913f2e7214553b21f1476ffbe28juan.gif)

2.细化

![](images/WEBRESOURCE7ae1c01c0a1168d39a06241307f2de51image.png)

![](images/WEBRESOURCEb40e142bc1cae6643a99d1b91833555dimage.png)

优化

```python
float angle=radians(chf('angle'));
vector zhou={1,0,0};

//数组变量 p
vector myp[];

for(int k=0;k<@numpt;k++) {
    vector pose=point(0,'P',k);
    append(myp,pose);
    //printf("%s\n",myp);
    
    
    }
//大循环确定旋转中心

for(int t=0;t<@numpt;t++){    
    //1.读取旋转中心位置 
    vector xin =myp[t];
    
    
    
    
    //2.构建以此为中心的旋转规则（四元数）
    float maxrot=chf('maxrot');
    float myu=point(0,'curveu',t);
    float angle=chramp('rampangle',myu);
    angle=fit01(angle,0,maxrot);
    angle=radians(angle);
    
    vector4 rot=quaternion(angle,zhou);
    
    
    //小循环。针对当前中心点，依次转动它后面的每个点
    for(int h=t+1;h<@numpt;h++){
        //读取旋转点的位置
        vector startp=myp[h];
        //归中心
        vector movep=startp-xin;
        //旋转
        vector rotatep=qrotate(rot,movep);
        //复位
        vector finalp=rotatep+xin;
        
        
        //把这个点写入、更新数组
        myp[h]=finalp;
     }
 
// //最后 把数组中最后的各点位置，给到对应每个点的位置p
 
     setpointattrib(0,'P',t,myp[t],'set');
 
 }
  

```

![](images/WEBRESOURCEbed663529f8130d8c97ff8ea6724e1cejuantf.gif)

[qrot.hip](attachments/WEBRESOURCEa0e6818a254ba3fa12ce37682fd68a7bqrot.hip)