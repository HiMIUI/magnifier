/* 
auther:xiexy;
date:2020-07-01;
dependency:jquery-3.4.1-min.js;
keyWord:图片放大镜
 */
$(function($) {
	$.fn.magnifier = function(attributes) {
		var $element = this;
		//判断传入的dom是否是图片
		if (!$element.is("img")) {
			console.error("传入的dom: "+ $element[0].className +" 不是图片类型.",
				"background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;",
				"background: #FCEBB6; color: #F07818; font-size: 17px;");
			return;
		}

		// 定义dom属性值
		var $IMAGE_URL = $element.attr("src");
		var $IMAGE_WIDTH = $element.width();
		var $IMAGE_HEIGHT = $element.height();
		var NATIVE_IMG = new Image();
		NATIVE_IMG.src = $element.attr("src");
		
		if($element[0].offsetWidth >= $element[0].naturalWidth){
			console.warn("图片"+ $element[0].className +"的尺寸大于实际尺寸，放大镜失效");
			return;
		}

		var defaults = {
			round: true,
			width: 200,
			height: 200,
			background: "#FFF",
			shadow: "0 8px 17px 0 rgba(0, 0, 0, 0.2)",
			border: "6px solid #FFF",
			cursor: true,
			zIndex: 999999
		}
		
		//存在新的放大镜尺寸，更新十字标位置
		if(!!attributes.newsize){
			defaults.width = attributes.newsize;
			defaults.height = attributes.newsize;
		}
		
		// 拓展配置
		var $options = $.extend(defaults, attributes);
		
		// 阻止默认事件、改变鼠标悬浮图案为十字图案
		$element.on('dragstart', function (e) { e.preventDefault(); });
		$element.css({
			"cursor": $options.cursor ? "crosshair" : "none"
		});
		
		// 创建放大镜容器
		var lens = document.createElement("div");
		
		//如果存在唯一标识符,ID名为"BlowupLens_后缀标识符"
		lens.id = !!attributes.magnifer_id ? "BlowupLens_" + attributes.magnifer_id : "BlowupLens";
		
		// 将容器添加到body上
		$("body").append(lens);
		
		// $绑定放大镜，初始化默认样式
		$blowupLens = !!attributes.magnifer_id ? $("#BlowupLens_" + attributes.magnifer_id) : $("#BlowupLens");
		$blowupLens.css({
			"position": "absolute",
			"border": "2px solid #FFF",
			"box-shadow": "rgba(0, 0, 0, 0.7) 0px 1px 10px",
			"visibility": "hidden",
			"background": "url("+ NATIVE_IMG.src +") 0 0 no-repeat",
			"border-radius": "50%",
			"pointer-events": "none",
			"z-index": "999999"
		});

		// 显示放大镜
		$element.mouseenter(function() {
			$blowupLens.css({
				"visibility": "visible"
			});
		})

		// 在图片上移动
		$element.mousemove(function(e) {

			// 放大镜坐标
			var lensX = e.pageX - $options.width / 2;
			var lensY = e.pageY - $options.height / 2;

			// 在原图上的相对坐标
			var relX = e.pageX - this.offsetLeft;
			var relY = e.pageY - this.offsetTop;

			// 移动的大图的坐标
			var zoomX = -Math.floor(relX / $element.width() * NATIVE_IMG.width - $options.width / 2);
			var zoomY = -Math.floor(relY / $element.height() * NATIVE_IMG.height - $options.height / 2);

			// 动态改变放大镜
			$blowupLens.css({
				"left": lensX,
				"top": lensY,
				"background-image": "url(" + $IMAGE_URL + ")",
				"background-position": zoomX + "px " + zoomY + "px"
			});
			//存在新的放大镜尺寸，更新放大镜
			if(!!attributes.newsize){
				$blowupLens.css({
					"width": attributes.newsize,
					"height": attributes.newsize
				})
			}
		})

		// 隐藏放大镜
		$element.mouseleave(function() {
			$blowupLens.css("visibility", "hidden");
		})
	}
})
