```python
float angle_in_deg=chf('rot');
float angle_in_rad=radians(angle_in_deg);
vector eulerAngle =set(angle_in_rad,0,0);
vector4 quat=eulertoquaternion(eulerAngle,0);//0 means rules
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

弧度---角度---欧拉角---四元数---3*3矩阵---4*4矩阵（默认加了个0001）---

关于 hedge库：

在 Houdini 的 VEX 中，hedge_ 开头的一系列函数主要用于操作网格的 

### 常见 hedge_ 系列函数

- hedge_next

获取同一多边形中，当前半边之后的那一条半边。

- hedge_prev

获取当前半边之前的半边，即在多边形中上一个连接边。

- hedge_nextequiv

返回与当前半边“等价”的下一个半边，常用于处理邻接结构（如无缝网格连接、插值等场景）。

- hedge_prim

获取当前半边所属的 primitive（多边形或面片）的编号。

- hedge_postdstpoint

 及 

分别返回在当前半边的目标顶点之后，连接的点 ID 和顶点 ID。

- hedge_presrcpoint

 及 

分别返回当前半边的源顶点之前那个连接点的点 ID 和顶点 ID。

### 这些函数适用的典型场景

- 拓扑遍历

：通过 hedge_next / hedge_prev 实现沿着面片的边循环。

- 查找相邻关系

：使用 hedge_nextequiv 快速定位与当前半边相邻的对应半边。

- 定位上下文几何元素

：通过 hedge_prim，你可以知道某条半边属于哪一个多边形（primitive）。

- 定位“前一个”/“后一个”顶点或点

：*_presrc* 和 *_postdst* 系列帮助你在网格中沿结构关系定位相关元素。

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

![](images/WEBRESOURCE162d385f442256f74839d31ca0a10f4aimage.png)

也可做父子关联

![](images/WEBRESOURCEc3be1d336b22767ed78151ba87ba1b0bimage.png)

[matrix_hedge.hip](attachments/WEBRESOURCE77bb87ce919501c7b19c340bdc4dbe21matrix_hedge.hip)