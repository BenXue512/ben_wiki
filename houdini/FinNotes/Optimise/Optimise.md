## 讲讲数据优化
#### 1.数据类型及其优化
* (attribcast)
* 可以缓存前优化数据

<img src="./images/WEBRESOURCE8c933a13be90192e52cf6b712d92a18cimage.png" width="300" />

*  模型超级远或者大,会出现渲染,显示bug也可以用attribcast,改到64显示

<img src="./images/WEBRESOURCE60891d01403a989d5a0b08e9a365fb94image.png" width="300" />
<img src="./images/WEBRESOURCEf6312086bccf2b3eb792412dc1fcfd4cfar.gif" width="600" />

#### 2.属性
* 定义N(自带默认类型是Nml)和定义 `v@s`自定义没指定数据类型  
* 不同数据类型旋转影响也不同的

<img src="./images/WEBRESOURCE6dbda1d5bb4f3751fb9da38456a3fc78image.png" width="300" />

<img src="./images/WEBRESOURCEa28798480de4b283ae65c1501bd1e04dimage.png" width="300" />


<img src="./images/WEBRESOURCE57da3f27332e3e5d77ad8cb647f736c4norm.gif" width="600" />


#### 3.retime
* tip：测试感觉19+版本retime没下面的问题了
* 需要把数据类型矫正
* vex sop都可
* 修改前(旋转错误)
<img src="./images/WEBRESOURCEbac943ea28c205b03a7a3c6999465b28w1.gif" width="600" />

* 修改完后(正确了)
<img src="./images/WEBRESOURCE15b587ccf4d069891f328fc19c66cdfbw2.gif" width="600" />                                                          
                                       
* 方法一

```vex
setattribtypeinfo(0,'detail','xform','matrix');
```
```vex
matrix mat =detail(0,'xform',0);
@P*=mat;
```
<img src="./images/WEBRESOURCEc106a10fb10dfdc3e72cc38ddce5a37dimage.png" width="600" />

* 方法二

<img src="./images/WEBRESOURCEc224c90c1c75bfb62556b9f35a757349chrome_Lq0va4BK1d.png" width="600" />

* 要告诉houdini 这个16f是Matrix矩阵

<img src="./images/WEBRESOURCEf7d2d4c9e54776322acfcdd9b13bc5b3chrome_3GRYBk9sX8.png" width="300" />