##Waterfall 是流体布局 jQuery 插件

* 当前版本: 1.0.7
* 更新时间: 2016.3.3

###安装方法
```
npm install jquery-waterfall --save
```

###使用方法
```
var $ = require('jquery');
var waterfall = require('jquery-waterfall');

$node.waterfall({/* 此处为设置选项, 可留空 */})
```

###设置选项
```
{
    selector:'.post-home',     //子元素class, 可留空
    columnCount:4,             // 列数,  纯数字, 可留空
    columnWidth:300,           // 列宽度, 纯数字, 可留空
    isResizable:false,         // 自适应浏览器宽度, 默认false
    end:function(){},          // 回调函数
}
```
