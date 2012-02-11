/**
 * @name jQuery waterfall Plugin
 * @version 1.0.6
 * @create 2012.1.30
 * @lastmodified 2012.2.11
 * @description Based on jQuery 1.4+
 * @author MuFeng (http://mufeng.me)
 * @url http://mufeng.me/waterfall.html
 **/
~function($){var 
/** 
 * @param wholeArg全局数组,储存参数
 * @param x:插件设置, y:对象集合, Water:构造函数
 **/
wholeArg = [],firstRun=0,
Water=function(x,y){
	this.options = x;
	this.element = $(y);
	this.init();
};
Water.prototype={
	// 当前对象绑定的事件
	init:function(){
		this.initArg();
		this.reSize();
		this.layout(this.getBricks(this.element));
	},
	// 获取子元素
	getBricks: function( $elems ) {
      var selector = this.options.itemSelector;
	  return $bricks = !selector ? $elems.children().not('.waterfall') : $elems.filter( selector ).not('.waterfall').add( $elems.find( selector ) );
    },
	// 获取相关参数, this.bricks:子元素集合, w:单个子元素宽度, n:列数
	getSize:function(){
		var	that = this.getBricks(this.element)[0],
			$that = $(that),
			columnCount = this.options.columnCount,
			columnWidth = this.options.columnWidth,
			parm = [],
			elemWidth = $that.outerWidth(true),
			windowWidth = $(window).width() -20,
			w = !columnWidth ? elemWidth : columnWidth,
			n = !columnCount ? parseInt(windowWidth/w) : columnCount;
		return parm.concat(w,n);
	},
	//初始化数组wholeArg, wholeArg[n]=0
	initArg:function(){
		if(!firstRun){
			var j,
				parm=this.getSize(),
				q=parm[1];
			for(j=0;j<q;j++){
				wholeArg[j]=0;
			}
			firstRun=1;
		}
	},
	// 重新给父级元素css赋值
	reSize:function(){
		this.element.css('position','relative');
		if(this.options.isResizable){
			var parm=this.getSize(),
				n=parm[1],
				w=parm[0];
			this.element.css({
				width:n*w,
				margin:'0 auto'
			})
		}
	},
	// 子元素重新排布
	layout:function($bricks){
		var i=0,$this = this.element,n=$bricks.length,
			$imgA = $this.filter('img').add($this.find('img')).eq(0),
			$imgP = $imgA.parent(),
			anim = this.options.isAnimated,
			dura = this.options.Duration, 
			ease = this.options.Easing,
			endfn = this.options.endFn,
			parm=this.getSize(),
			w=parm[0],
			t,
			maxWidth=$imgP.width() - parseInt($imgA.css('padding-left'))-parseInt($imgA.css('padding-right'))
					-parseInt($imgA.css('margin-left')) - parseInt($imgA.css('margin-right'));
		$bricks.css('display','none');
		// imgReady方法
	var imgReady = (function () {
		var list = [], intervalId = null,

		// 用来执行队列
		tick = function () {
			var i = 0;
			for (; i < list.length; i++) {
				list[i].end ? list.splice(i--, 1) : list[i]();
			};
			!list.length && stop();
		},

		// 停止所有定时器队列
		stop = function () {
			clearTimeout(intervalId);
			intervalId = null;
		};

		return function (url, ready, load, error) {
			var check, width, height, newWidth, newHeight,
				img = new Image();
			
			img.src = url;

			// 如果图片被缓存，则直接返回缓存数据
			if (img.complete) {
				ready(img.width, img.height);
				load && load(img.width, img.height);
				return;
			};
			
			// 检测图片大小的改变
			width = img.width;
			height = img.height;
			check = function () {
				newWidth = img.width;
				newHeight = img.height;
				if (newWidth !== width || newHeight !== height ||
					// 如果图片已经在其他地方加载可使用面积检测
					newWidth * newHeight > 1024
				) {
					ready(newWidth, newHeight);
					check.end = true;
				};
			};
			check();
			
			// 加载错误后的事件
			img.onerror = function () {
				error && error();
				newWidth = newHeight = 0;
				ready(newWidth, newHeight);
				check.end = true;
				img = img.onload = img.onerror = null;
			};
			
			// 完全加载完毕的事件
			img.onload = function () {
				load && load(img.width, img.height);
				!check.end && check();
				// IE gif动画会循环执行onload，置空onload即可
				img = img.onload = img.onerror = null;
			};

			// 加入队列中定期执行
			if (!check.end) {
				list.push(check);
				// 无论何时只允许出现一个定时器，减少浏览器性能损耗
				if (intervalId === null) intervalId = setTimeout(tick, 50);
			};
		};
	})();
			sort();
			// 重排函数
			function sort(){
				if(i<n){
					var brick = $bricks[i], $brick = $(brick),$img =  $brick.filter('img').add($brick.find('img')),
						h = $brick.outerHeight(true),
						k = argMin(wholeArg);
						// 分开处理, 有图和无图子元素
						if($img.length>0){
							var isrc = $img.attr('src');
							$img.removeAttr('src');
							imgReady(isrc,function(ix, iy) {
								ix = ix ? ix:maxWidth;
								iy = iy ? iy:0;
								y = iy * maxWidth / ix ;
								ix = maxWidth;
								$img.attr('src',isrc).css({
										width:ix,
										height:iy
								});
								var heightMax = Math.max.apply( Math,wholeArg);
								$this.height(heightMax);
								$brick.addClass('waterfall');
								var hplus = $brick.outerHeight(true);
								!anim ? ($brick.css({
									display:'block',
									position:'absolute',
									left:k*w,
									top:wholeArg[k]
								})):(
									$brick.css({
										display:'block',
										position:'absolute',
										left:0,
										top:heightMax
									}).stop().animate({
									left:k*w,
									top:wholeArg[k]
									},
									{
										Duration:dura, 
										Easing:ease
									})
								);
								wholeArg[k]+=hplus;
								i++;
								t = setTimeout(sort, 50)
							});
						}else{
							var heightMax = Math.max.apply( Math,wholeArg);
								$this.height(heightMax);
								$brick.addClass('waterfall');
								var hplus = $brick.outerHeight(true);
								!anim ? ($brick.css({
									display:'block',
									position:'absolute',
									left:k*w,
									top:wholeArg[k]
								})):(
									$brick.css({
										display:'block',
										position:'absolute',
										left:0,
										top:heightMax
									}).stop().animate({
									left:k*w,
									top:wholeArg[k]
									},
									{
										Duration:dura, 
										Easing:ease										
									})
								);
								wholeArg[k]+=hplus;
								i++;
								t = setTimeout(sort, 10)
						}
				}else if(i>=n){
					//所有子元素排布完成, 停止函数循环
					clearTimeout(t);
					t=null;
					var heightMax = Math.max.apply( Math,wholeArg);
					$this.height(heightMax);
					if (typeof endfn == 'function'){
						endfn.call( $bricks );
					}
				}
			}
			// 获取数组中最小值的序号
			function argMin(a) {
				var e, d = 0,
				b = a[0],
				c = a.length;
				for (e = 1; e < c; e++) {
					if (a[e] < b) {
						b = a[e];
						d = e
					}
				}
				return d
			}
	}

};
$.waterfall=function(x,y){
	x=$.extend({
		isResizable: false,
		isAnimated: false,
		isAppend:false,
		Duration: 500,
		Easing: "swing",
		endFn: function(){}
	},x);
	$.data(y,'waterfall', new Water(x,y));
	return y;
};
$.fn.waterfall=function(x){
	return $.waterfall(x,this);
};
function log(y){
	console.log({}.toString.call(y)+' | '+y);
}
}(jQuery);