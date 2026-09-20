## h to maya missing  uv
一般遇到这2种 情况 90%都是:物体有叠面 or uv叠面   

- 1.uv叠面:uv叠面需要处理下uv排布(uv有时候需要转到点上才能读取到)

- 2.物体叠面:造成的原因可能比较多boolen(弄成no polygon)remesh(最后导出用clean清理下)