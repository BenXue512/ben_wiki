tip：这里的001是指物体的前面copy物体的朝向，我是朝向z轴（因为我copy 想让他跟着法线走）

```python
p@orient=dihedral({0,0,1},@N);



float angle=radians(ch('angle')); //转为角度制  
vector axis =normalize(chv('axis'));//不归一化会出问题  下面物体要转的轴

vector4 rot =quaternion(angle,axis); 
p@orient=qmultiply(p@orient,rot);
```