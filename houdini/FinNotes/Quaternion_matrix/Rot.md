 matrix 4

**4@m=ident();**

**float angle=chf('angle');**

**vector axis =chv('axis');**

**rotate(@m,angle,axis);**

**@P*=@m;**

orient

float angle=chf('angle');

vector axis =chv('axis');

p@orient=quaternion(angle,axis);

v@P=qrotate(p@orient,v@P);

up  N 

float angle=radians(chf('angle'));

vector axis =normalize(@N);

vector4 aa=quaternion(angle,axis);

v@up=set(0,0,-1);

v@up=qrotate(aa,@up);