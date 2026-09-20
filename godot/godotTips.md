# 基础操作笔记：
## 1.图层
order  Z  -10意思

<img src="./images/WEBRESOURCE8f2764b3d3a68bbf76c6320e3d6c4b37image.png" width="800" />

## 2.创建tiles（瓷砖）

![](images/WEBRESOURCE3372773c558fd3b294be10c31eaf4afaimage.png)
::: tip 操作步骤
**1.创建 map—— 2.设置TileSet size——3.放入贴图（Tileset里）——4.TileMap里编辑**
:::
## 3.动图

#### 第一步： 
:::tip 操作步骤
1.在setup中——2.设置素材的尺寸（如何知道看图片）3.——清楚超出的像素  

tip：注意这里右边的素材只选中第一个 1*1  （不然导致后面动画不了   右键可以删除
:::
![](images/WEBRESOURCEdfa227bcefbde854ad48e20f8470aa75image.png)


#### 第二步：
:::tip 操作步骤
1.设置速度 ——2.设置随机——3.添加动画（有多少素材动画点多少下）
:::
![](images/WEBRESOURCEe376fe9cbd183d43103501857846b6d0image.png)


遇到的问题动图始终不能add element

<img src="./images/aniwrong.png" width="400" />

解决：

<img src="./images/fixani.png" width="600" />

第二条不用改，那是绘制时候的大小！



## 4.一个基础的palyer 
 包含：

![](images/WEBRESOURCE5a3eee103b84c887d08a33a74ba12714image.png)

## 5.绘制地图碰撞体

![](images/WEBRESOURCE6c2167ac7a7f3c8562e2f8d58512e55dimage.png)

## 6.创建碰撞代码

![](images/WEBRESOURCE7a61050b1edb40cd09da17e40dbfcfffimage.png)

## 7.自定义快捷键

![](images/WEBRESOURCE902405bc34ca176d30cb1a041d13d242image.png)

## 8.更改对应快捷键代码

![](images/WEBRESOURCEebbf52a85129d6ca86d1d3459fdcccc3image.png)

## 9.匹配人物左右朝向

![](images/WEBRESOURCE0dd83be6dc64d7b56247e42193d2407eimage.png)

## 10.人物掉出世界地图重新开始游戏

#### 1.限制着范围

![](images/WEBRESOURCE520345ddd7cd3e2cf76bfddd7e2774d9image.png)

#### 2.代码，用节点关联 写超出reload

![](images/WEBRESOURCEed5a5ff4c8f2c98b24e500364a28e2f4image.png)



## 素材制作

让ai出了素材之后我们如何单独抠出来呢，可以结合nuke

<img src="./images/roto.png" width="400" />




##  案例学习

* 视频地址：https://www.bilibili.com/video/BV14KfoBQEDP?spm_id_from=333.788.player.switch&vd_source=044ee2998086c02fedb124921a28c963&p=2

### 1.文件布局

<img src="./images/set.png" width="400" />

### 2.Title set

* 因为我们是动态瓷砖，所以我这里点 <mark>否</mark> （不让系统自动把瓷砖放进图集里）我们要处理的
* TileSet-select  设置动画

<img src="./images/title.png" width="400" />

### 3.绘制 Title 

* 新建 TileMapLayer —— Tile set —— Terrain Sets (用来绘制) ——右下 Tile Set —— setup选定瓷砖 —— Select 选择 —— Paint （右键擦除） ——  TileMap 绘制

    * <img src="./images/Tile1.png" width="400" />

    * <img src="./images/Tile2.png" width="400" />

    * <img src="./images/Tile3.png" width="400" />

    * <img src="./images/Tile4.png" width="400" />

    * <img src="./images/Tile5.png" width="400" />

    * <img src="./images/Tile6.png" width="400" />

        * 只涂不和空气交接的瓷砖

* 像素模糊的画 
    * project seeting —— Textures ——— Nearest        

### 4.Create Char

* Create

    * Duplicate .tscn -- 新建文件夹 secen - characters - player -- New secen 

    * CharacterBody2D (save as player.tscn) --AnimatedSprite2D -- Sprite Frames 

    * -- 网格图标加载图片 -- rename（idle front）待机 -- 添加其他动作

    * change Fps to control speed

    * <img src="./images/char.png" width="400" />

* 绑定快捷键
    * project > input map > add new action(自定义名字) > ➕绑定快捷键 

    * <img src="./images/move.png" width="400" />