# magnifier
# jquery扩展插件-图片放大镜

## 使用方法：


### Html：
##### <img class="demo" src="../pic.jpg" width="600" height="auto" style="position: relative;margin: 0 auto;display: block;">


### Javascript：
#### $(function(){
####	$(".demo").magnifier({
####		"magnifer_id": "1",//页面存在多张图片时的唯一标识符，不传默认为一张图，如果有传值放大镜ID后面加上后缀"_唯一标识符"
####		"newsize": "150"//放大镜大小，默认不传为200
####	});
#### })
