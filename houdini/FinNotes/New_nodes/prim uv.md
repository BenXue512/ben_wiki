int prim;

vector myuv;

vector my_uv_slf=set(ch('x_scale'),0,0);

xyzdist(1,@P,prim,myuv);

v@P=primuv(1,'P',prim,my_uv_slf);

xyzdist返回   prim 对应最近面的面序号

myuv （对面面uv坐标）

dist 最近距离

my_uv_slf 外部引用函数