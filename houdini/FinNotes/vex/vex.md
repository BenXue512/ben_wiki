## vex

## Class
### 1.matrix
* matrix能干什么用
* 移动.旋转.缩放
* 如何使用

<img src="./images/WEBRESOURCE18ace30bfb0a4306f24f5cdc390f8ab3image.png" width="400" />

<img src="./images/WEBRESOURCE1a3811263eedacc124e29a45da01ecc7image.png" width="400" />

* 函数之间的关系
* 可以混合使用并非一定是一类

<img src="./images/WEBRESOURCE473ed478007641fe932cc7096e870adeimage.png" width="600" />

<img src="./images/WEBRESOURCEab6d114500385457fd46069e7756885bmsedge_SV8PVEmgR0.png" width="600" />


<img src="./images/WEBRESOURCEea18137c9da423563eecf320dfaf035aimage.png" width="600" />

* 可以参考之前自己的笔记 
[记矩阵基础概念-CSDN博客](https://blog.csdn.net/JACKLONGFX/article/details/135269163?spm=1001.2014.3001.5502)


```python
    i[]@dian;
    @dian=primpoints(0,@primnum);

    matrix indx =ident();
        float angle=radians(chf('angle'));
        vector axis=normalize(fit01(rand(@primnum),{-1,-1,-1},{1,1,1}));
        rotate(indx,angle,axis);
        
        scale(indx,(1,2,1));
        
        translate(indx,@P*ch('move'));
    foreach(int kk;@dian){
        vector dianp=point(0,'P',kk);
        dianp-=@P;
        dianp*=indx;
        dianp+=@P;
        //dianp+=@P*ch('move');

        setpointattrib(0,'P',kk,dianp,'set');

    }             
 ```


<a href="/hip_files/matrix_01.hip" target="_blank" download>📦 下载matrix_01.hip</a>


### 2.TrigonometricFunctions & Quaternions & Matrix

* 介绍
<img src="./images/WEBRESOURCE9d581eb7ed36ab455e501d04fa860d8eimage.png" width="600" />

* 三角函数 
* tip：点有位置信息(容易忽略,prim也有点信息,只不过在hou中没显示,面的点信息就是对应物体的中心)一个点可以用prim函数获取,多个点 可以用primpoints(0,@primnum).

<img src="./images/WEBRESOURCEb680694e21325fad0d47bdf0a37105ccimage.png" width="300" />

<img src="./images/WEBRESOURCE6f6b3de5376b6e3696c5d04cfd75fd0aimage.png" width="300" />


<img src="./images/WEBRESOURCE7c47bc1a79272841af90f4fefaab586cimage.png" width="600" />

* 三角函数旋转

<img src="./images/WEBRESOURCE64a3b4934d9f225c746b3f2069b1f949image.png" width="600" />

* 四元数

<img src="./images/WEBRESOURCE78b641b5e669703eb848c037bfbd7669image.png" width="600" />

* 四元数的‘二化’ 操作：

<img src="./images/WEBRESOURCE2106da1cc34fbd87eb7ab968ff25c712image.png" width="600" />

<img src="./images/WEBRESOURCE88c57ee4a7be7c3a17e7b64cbf880462image.png" width="600" />

* dihedral
向量a-----向量b(定义规则,再用qrotate旋转)

<img src="./images/WEBRESOURCE683177c189b13d7f639c5c4c4ed041a7image.png" width="600" />

<img src="./images/WEBRESOURCE7ae7b2962073305b0d4bddfbe20e3917image.png" width="600" />

<img src="./images/WEBRESOURCE8e9d264e8b34455108bd53a96d4d28d4image.png" width="600" />

- * 不需要归一化操作

<img src="./images/WEBRESOURCEaf9d21659ce43dd5658a4f94e235d790image.png" width="600" />

eg：想获取关门的整个经过可以用函数slerp()

q0 =0   q1=1  qt=0.5

<img src="./images/WEBRESOURCEd0234b5df9ab94b8eb3cb424dc3b932ddoor.gif" width="600" />

### 3.案例
* 书本堆叠案例

<img src="./images/WEBRESOURCEc32aa8e574e5dc9be70f862f689cabefmsedge_4D17H8t1YI.png" width="600" />

<img src="./images/WEBRESOURCEa30a9d74b033c35b439a301599fc2c34image.png" width="400" />

<img src="./images/WEBRESOURCE0e993d1ecc5f5720450ddf563e0634e2image.png" width="600" />

<img src="./images/WEBRESOURCE95c7c938caac47b00ff45d11f4591f7aimage.png" width="300" />

* 书本厚度

<img src="./images/WEBRESOURCE2d81b0a080dab2f6750a9c627d53eb30image.png" width="600" />

* 线变书

<img src="./images/WEBRESOURCE8c71d2554e7da7177a0ac6c66b225a13msedge_BvKjCmIS9j.png" width="600" />

<a href="/hip_files/qrot.hip" target="_blank" download>📦 下载qrot.hip</a>

### 4.quaternions

<img src="./images/WEBRESOURCE8e05b145f8e0888d8053488bf7f45ea5image.png" width="600" />

<img src="./images/WEBRESOURCE7fe0e8f2618c89068f2f2d242f9e545dimage.png" width="300" />

<img src="./images/WEBRESOURCE42322a4a8227a6fc96ef0f2f9abff1dcimage.png" width="600" />


<img src="./images/WEBRESOURCEa2d1ec90bb1e57b6cd55582b8ce2038cimage.png" width="300" />

<img src="./images/WEBRESOURCE8d3da22b4fbd8e5fb7305c5689b39476image.png" width="300" />



<img src="./images/WEBRESOURCE5b44b019d3cf7887fe8c817f61c48f21image.png" width="600" />

* 四元数转换

<img src="./images/WEBRESOURCEa79aebc226b83f19102ddee3760acdd5image.png" width="400" />

<img src="./images/WEBRESOURCE93ad1acc7181142df5477808b9bc25b3image.png" width="400" />

<img src="./images/WEBRESOURCE8f86d47de01034da1bf6c3e5e1d1eacaimage.png" width="600" />

<img src="./images/WEBRESOURCEb1301e7164b3be02af104f215f92eb8dimage.png" width="600" />

### 5.案例
* 卷曲

<img src="./images/WEBRESOURCEda9e398d90e216e8d8aa28081e1ba916image.png" width="400" />

* 过程稿

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

<img src="./images/WEBRESOURCE942e2913f2e7214553b21f1476ffbe28juan.gif" width="600" />

* 细化

<img src="./images/WEBRESOURCE7ae1c01c0a1168d39a06241307f2de51image.png" width="400" />

<img src="./images/WEBRESOURCEb40e142bc1cae6643a99d1b91833555dimage.png" width="600" />

* 优化

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

<img src="./images/WEBRESOURCEbed663529f8130d8c97ff8ea6724e1cejuantf.gif" width="600" />

<a href="/hip_files/qrot_q.hip" target="_blank" download>📦 下载qrot_q.hip</a>

### 6.Houdini 矩阵坐标空间转换
```python
float angle_in_deg=chf('rot');
float angle_in_rad=radians(angle_in_deg);
vector eulerAngle =set(angle_in_rad,0,0);
vector4 quat=eulertoquaternion(eulerAngle,0); //0 means rules
matrix3 rotM=qconvert(quat);
matrix m =set(rotM);
@P*=m;

//绕着y轴位移
@P*=invert(m); //归0
matrix translate_matrix=ident();
translate(translate_matrix,set(0,ch('Y_trans'),0));
translate_matrix*=m;
@P*=translate_matrix;

//绕着z旋转
@P*=invert(translate_matrix);
float angle_in_degZ=chf('rotZ');
float angle_in_radZ=radians(angle_in_degZ);
vector eulerAngleZ =set(0,0,angle_in_radZ);
vector4 quatZ=eulertoquaternion(eulerAngleZ,0);//0 means rules
matrix3 rotMZ=qconvert(quatZ);
matrix m_Z =set(rotMZ);
m_Z*=translate_matrix;
@P*=m_Z;
```


* 弧度---角度---欧拉角---四元数---3*3矩阵---4*4矩阵(默认加了个0001)

### 7.hedge库
* 在Houdini的VEX中,hedge_ 开头的一系列函数主要用于操作<mark>网格的半边</mark>(half-edge)结构,这是几何处理和网格遍历中非常实用的功能.下面是它们的功能概要：
* 常见hedge_ 系列函数
- hedge_next

获取同一多边形中,当前半边之后的那一条半边。
- hedge_nextequiv

返回与当前半边“等价”的下一个半边，常用于处理邻接结构(如无缝网格连接、插值等场景)。
- hedge_prim

获取当前半边所属的primitive(多边形或面片)的编号。
- hedge_postdstpoint

分别返回在当前半边的目标顶点之后,连接的点 ID和顶点ID。
- hedge_presrcpoint

分别返回当前半边的源顶点之前那个连接点的点 ID和顶点ID。

* 这些函数适用的典型场景

- 拓扑遍历

通过 hedge_next / hedge_prev 实现沿着面片的边循环。
- 查找相邻关系

使用 hedge_nextequiv快速定位与当前半边相邻的对应半边。

- 定位上下文几何元素

通过 hedge_prim，你可以知道某条半边属于哪一个多边形(primitive)。

- 定位“前一个”/“后一个”顶点或点

*_presrc* 和 *_postdst* 系列帮助你在网格中沿结构关系定位相关元素。

获取随机物体的轴坐标

```python

int primNumber=2;
int edgeA=primhedge(0,primNumber);//获取面对应的边（随机
int edgeB=hedge_next(0,edgeA);//获取临边
int edgeA_P1=hedge_srcpoint(0,edgeA);//获取起始点序号
int edgeA_P2=hedge_dstpoint(0,edgeA);//获取末尾点序号
int edgeB_P1=hedge_srcpoint(0,edgeB);
int edgeB_P2=hedge_dstpoint(0,edgeB);

vector A1=point(0,'P',edgeA_P1);
vector A2=point(0,'P',edgeA_P2);
vector B1=point(0,'P',edgeB_P1);
vector B2=point(0,'P',edgeB_P2);

vector X =normalize(A2-A1);
vector tmp=normalize(B2-B1);
vector Y=cross(tmp,X);
vector Z=cross(X,Y);

//vector center=getbbox_center(0);
vector center=prim(0,'P',primNumber);

matrix m=set(X,Y,Z,center);
setcomp(m,0,0,3);
setcomp(m,0,1,3);
setcomp(m,0,2,3);  //见下图

4@xform=m;

```

<img src="./images/WEBRESOURCE162d385f442256f74839d31ca0a10f4aimage.png" width="300" />

* 也可做父子关联

<img src="./images/WEBRESOURCEc3be1d336b22767ed78151ba87ba1b0bimage.png" width="600" />

<a href="/hip_files/matrix_hedge.hip" target="_blank" download>📦 下载matrix_hedge.hip</a>

### 8.用旋转位移自定义矩阵 

<img src="./images/WEBRESOURCE97a0369aa2eb7fa2a5b18d08e7b3d362image.png" width="600" />


<a href="/hip_files/Transform_maketranform.hip" target="_blank" download>📦 下载Transform_maketranform.hip</a>

* 取消物体旋转（有局限）

<img src="./images/WEBRESOURCEcff28d58ae0a2f221326129e2d5fc4c8image.png" width="600" />

<img src="./images/WEBRESOURCE8b52c8dc87c19e47811bc6896a17d266image.png" width="600" />

<img src="./images/WEBRESOURCE4a8590243a411ce8a8620666351d8e4aimage.png" width="600" />

### 9.rot
``` python
//matrix 4
4@m=ident();
float angle=chf('angle');
vector axis =chv('axis');
rotate(@m,angle,axis);
@P*=@m;

//orient
float angle=chf('angle');
vector axis =chv('axis');
p@orient=quaternion(angle,axis);
v@P=qrotate(p@orient,v@P);


//up,N 
float angle=radians(chf('angle'));
vector axis =normalize(@N);
vector4 aa=quaternion(angle,axis);
v@up=set(0,0,-1);
v@up=qrotate(aa,@up);
```

### 10.quaternion&&dihedral
```python
// quaternion(matrix3)
// quaternion(angle,axis)
// quaternion(angleaxis)
//dihedral(vectora,vectorb)   
##向量a  转换 到向量b（对齐）得到的是四元数或旋转矩阵所以还要qrotate到p 
##面对齐需要个up向量

##  eg:1.transform 物体  用aw读取物体xform驱动物体（应该效果一样）
matrix m =detail(1,'xform');
matrix3 m3=matrix3(m);
vector4 rot=quaternion(m3);
@P=qrotate(rot,@P);
## 四元数只记录旋转，不记录位移（3*3转换的嘛）

##  2.绕旋转轴转圈
float angle=radians(ch('angle')); 
##转为角度制
vector axis =normalize(chv('axis'));
##不归一化会出问题
vector4 rot =quaternion(angle,axis); 
@P=qrotate(rot,@P);                 
#最后2句话都固定的  所以只要定义前面参数即可

##   3.同理
float angle=radians(ch('angle'));
##转为角度制
vector axis =normalize(chv('axis'));
##不归一化会出问题
vector4 rot =quaternion(angle*axis); 
@P=qrotate(rot,@P);                 
#最后2句话都固定的  所以只要定义前面参数即可


## 4.向量a  转换 到向量b（对齐）
vector a =point(0,'P',0)-point(0,'P',1);
vector b =point(1,'P',0)-point(1,'P',1);
vector4 rot =dihedral(a,b);
@P=qrotate(rot,@P);

```
* 3*3 四元数 轴心都在世界中心(0,0,0) 
所以需要先归圆心在处理,在加回去
``` python
vector pos =point(0,'P',0);  
//基于那个点归圆心
@P-=pos;
@P=qrotate(rot,@P);
@P+=pos;
```
* 需要转面所以在prim层级处理

<img src="./images/WEBRESOURCE975488e4d4e0f19d02cfb3d1e4e64bcf6h4ezK23iU.png" width="400" />

<img src="./images/WEBRESOURCE7d54154fe771c5ed143c0756da70ef86bb.gif" width="400" />

```vex
int pnum[]=primpoints(0,@primnum);
vector a=point(0,'P',pnum[0]);
vector b=point(0,'P',pnum[1]);
vector axis=normalize(a-b);
float angle=radians(ch('angle')); //@Frame
vector4 rot=quaternion(angle,axis);

for(int i=0;i<len(pnum);i++){
vector pos =point(0,'P',pnum[i]); 
//循环每个面获取轴开始转的点
pos-=@P;    
pos=qrotate(rot,pos);    
pos+=@P;    
setpointattrib(0,'P',pnum[i],pos);
//返回到点属性上    
}
```
* frac 取小数部分  
eg:frac(@Frame/30)30帧一个循环


### 11.@N 到Gradient
```vex
v@N=normalize(@N);
v@gradient=normalize(v@gradient);
vector4 ne=dihedral(v@N,v@gradient);
vector4 nne=slerp({0,0,0,1},ne,ch('basic'));
v@N2=qrotate(nne,@N);
```
<img src="./images/WEBRESOURCEf81fce2e9130849098929eacbc3e5332qrot.gif" width="600" />

### 12.一些学习实战案例
* 1.让粒子在模型周围
sopsolver中
```vex
vector mypos;
vector myuv;
int myprim;
float mydist;
vector hitpos;
vector hituv;
  
mydist= xyzdist(1, @P, myprim, myuv);
v@P_aim=primuv(1,'P', myprim, myuv);
v@N_aim=primuv(1,'N', myprim, myuv);

if(mydist<ch('Threshold'))
{
   @P=v@P_aim-v@N_aim*fit01(rand(@ptnum),ch('min'),chf('max'));
   v@v=ch('vscale');
}
// 求出点 第二端口模型上对应的最近点 
//@P=的话就贴模型上了根据法线来点便宜,限制下速度,不要过快
```

* 2.判断点在模型内外
```vex
vector mypos;
vector myuv;
int myprim;
float mydist;
vector hitpos;
vector hituv; 
mydist= xyzdist(1, @P, myprim, myuv);
v@P_aim=primuv(1,'P', myprim, myuv);
v@N_aim=primuv(1,'N', myprim, myuv);
i@hitprim = intersect(1, @P, v@N_aim*100,hitpos, hituv);

if(i@hitprim ==-1)
{
    removepoint(0,@ptnum);
}
```

<img src="./images/WEBRESOURCE8c367647f99dbc1ba295216709078783image.png" width="200" />

* N1 为内部点  N2外部
* * 找到所有点对应的物体上的最近点
* * 同时获取法线   
* * intersect求交集  如果-1,没有交集就表示在模型外部

* windingnumber   缠绕处理内外

<img src="./images/WEBRESOURCE1009a99a4ab94a65d28c40eeb22d8cfft.gif" width="600" />

* 3.缠绕效果

```vex
// 获取第一个点
vector minpos = minpos(1, @P);
@P = minpos;
vector currentpos = @P;
// 设置初始变量
vector dir = chv("axis");
int newprim = addprim(0, "polyline");
for( int i=0; i < chi("number_of_pounts"); i++ ) {
    //获取当前处理点，最近表面上的法线
    int closept = nearpoint(1, currentpos);
    vector closeN = point(1, "N" ,closept);
    //计算新的点 点位置
    vector newpos = normalize(cross(closeN, dir + curlnoise(currentpos + i * 0.01) * ch("noise"))) * ch("stepsize");
    //将新的点 重新投射到物体表面
    vector  projectpos = minpos(1, currentpos + newpos);
    //配置新的点
    int newpt = addpoint(0, projectpos + closeN * ch("offset") * 0.00001 * i);
    addvertex(0, newprim, newpt);
 //将新的点，设置为下次一次交互的点
    currentpos = projectpos;
}
```

* 需要一定规则的缠绕类似自上而下,需要加一些判定条件

<img src="./images/WEBRESOURCE6b8d528628ddeb51f6df26d125d9a635ts.gif" width="600" />

* 4.删除相机外的
* 第二端口为相机（是点）

``` vex
vector C=toNDC(chs('cam'),@P);
if(C.x<chf('x_min')||C.x>ch('x_max')||C.y<chf('y_min')||C.y>chf('y_max')||C.z==0){
removepoint(0,@ptnum);
}
vector p2=point(1,'P',0);
f@d=dot(@N,p2);
//@Cd=set(@d);
if(@d>0){
removepoint(0,@ptnum);}
```
* 5.add lines

```vex
vector pos=point(2,'P',0);
int pt=addpoint(0,pos);
int count=0;
int numpt=npoints(2);
for(int i=0; i<numpt; i++){
int next= (count+01)%numpt;
vector npos=point(2,'P',next);
vector norm=uvsample(1,'N','P',pos);
vector interpos,uv;
int inter=intersect(1,pos-norm*0.01,(npos-pos)*.95,interpos,uv);
if(inter>=0){
npos=interpos;
}
int newpt=addpoint(0, npos);
int line= addprim(0,'polyline',pt,newpt);
pos=npos;
pt=newpt;
count=next;
}
```

<img src="./images/WEBRESOURCE0b1b5f5b9bf07d163be83375967a0828image.png" width="600" />

* 6.uv to obj

<img src="./images/WEBRESOURCE8ddad119d7263c9cf808cec12fa43f06image.png" width="600" />

<a href="/hip_files/uv_to_obj.hip" target="_blank" download>📦 下载uv_to_obj.hip</a>

* 7. Follow Particles

<img src="./images/WEBRESOURCE6182d8a274b28a1c1af1aacc1dfe0530ParFollow.gif" width="600" />

* 如何移动

<img src="./images/WEBRESOURCE7f951148f23f7bd9e94ba197bb089079image.png" width="600" />

* 如何还原回去
```vex
v@P=uvsample(1,'P','uv',v@P);
```
通过一二端口的uv属性,去一 一对应获取P
eg：之前做好的属性(mops_falloff)还原回来：

```vex
f@mops_falloff=uvsample(1,'mops_falloff','uv',v@uv);
```

<a href="/hip_files/ParFollow.hip" target="_blank" download>📦 下载ParFollow.hip</a>

* 8.海草

*如何取中线

<img src="./images/WEBRESOURCE653f5e58a8f6ec3b60f617454a53aa20image.png" width="400" />

用clip 切一刀,获取切出来的点(会带uv属性)


<img src="./images/WEBRESOURCE1d68715df2098c5d5af5ae342cac503eimage.png" width="400" />

```vex
v@P=uvsample(1,'P','uv',@uv);
```
<a href="/hip_files/Grass_motion_v006.hip" target="_blank" download>📦 下载Grass_motion_v006.hip</a>

* 9.vex Functions 

* * nuniqueval : 返回整数或字符串属性中的唯一值数量。

```vex
i@nup=nuniqueval(0,'point','foo');
```

* * niquevals:返回整型或字符串属性中所有值的唯一值
```vex
i[]@nup=uniquevals(0,'point','foo');
```

* * uniqueval：返回整型或字符串属性所有值中唯一值集合中的一个值。
``` vex
i@nup=uniqueval(0,'point','foo',1);
```

* 10.关于软着路
* 缓慢减少速度

```vex
vector accel = volumesamplev(1, 0, @P);
float as = length(accel);
if (as > 15) as = 15 + log(1 + as-15)/log(2);
```
* houdini中log（）= log2.7（）就是数学中的自然对数的底数 in（）

<img src="./images/WEBRESOURCE5b0e3ed2194f53541e3eadd8b71ccdf0image.png" width="600" />

<img src="./images/WEBRESOURCE5d2cf95de454a095b9ebcfc625f0cf0dimage.png" width="600" />

<img src="./images/WEBRESOURCE0728fd8bc3ce01b5e22b91b56533e131image.png" width="600" />

```vex
accel = normalize(accel) * as;
v@accel = accel;
f@acc_speed = as;
f@g_star = dot(v@N, (set(0,-9.81,0)-v@accel)) * (-1);
if (f@g_star > 12) f@g_star = 12 + log(f@g_star-11)/log(2);
```

<img src="./images/WEBRESOURCEb7f2e2f81ddc99cc1c2f02850b566adfimage.png" width="400" />

* 11.vop
* * rop_ripple
* * 1.多个点需要用到 nearpoint 去获取附近的点pos.

* * 2. 破形 noise 加在第一个noise前.

<img src="./images/WEBRESOURCEb5cc8b6968aa922cbec36ce29395825cimage.png" width="600" />

<a href="/hip_files/ripple_vop.hip" target="_blank" download>📦 下载ripple_vop.hip</a>
