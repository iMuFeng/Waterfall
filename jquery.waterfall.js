/**
 * @name jQuery waterfall Plugin
 * @version 1.0.7
 * @create 2012.1.30
 * @lastmodified 2013.10.13
 * @description Based on jQuery 1.4+
 * @author MuFeng (http://mufeng.me)
 * @url http://mufeng.me/waterfall.html
 **/
~function($){
/**
 *
 * @param array: 全局数组,储存参数
 * @param x: 插件设置, y: 对象集合, Water: 构造函数
 *
 **/

var array, Water=function(x,y){
	this.options = x;
	this.element = $(y);
	this.fun = "";
	this.init();
};
Water.prototype={
	init:function(){ // 初始化
		this.layout();
	},
	
	selector: function() { // 获取子元素
		var a = this.options.selector,
			b = this.element;
		return !a ? b.children().not('.waterfall') : b.filter(a).not('.waterfall').add(b.find(a));
    },
	
	measure:function(){
		var _ = this,
			s0 = $(_.selector()[0]), 
			
			isResizable = _.options.isResizable,
			
			col_count = _.options.columnCount,
			col_width = _.options.columnWidth,
			
			ele_width = s0.outerWidth(true),
			win_width = !isResizable ? _.element.width() : ($(window).width() - 20); // 减去滚动条宽度
			
		col_width = col_width || ele_width; // 子元素宽度
		col_count = col_count || parseInt(win_width/col_width); // 子元素列数
			
		_.element.css("position","relative");
		
		if( isResizable ){
			_.element.css({
				"width": col_width * col_count,
				"margin-left": "auto",
				"margin-right": "auto"
			});
		}
			
		return [col_width, col_count];
	},
	
	layout: function(){
		
		var _ = this,
			b = _.measure();
			
		array = array ? array : new Array(b[1]);	
	
		$.each(array, function(index, value){
			if( value === undefined ) array[index] = 0;
		});

		_.selector().each(function(){
			var _this = $(this),
				index = $.inArray(Math.min.apply(Math, array), array);
					
			_this.css({
				left: index * b[0],
				top: array[index],
				position: "absolute"
			}).addClass('waterfall');
				
			array[index] += _this.outerHeight(true);
		});
			
		_.element.css("height", Math.max.apply(Math, array));
		
		_.options.end.call(this);
	}

};
$.waterfall=function(x,y){
	x=$.extend({
		selector: "",
		columnWidth: 0,
		columnCount: 0,
		isResizable: false,
		end: function(){}
	},x);
	$.data(y,'waterfall', new Water(x,y));
	return y;
};
$.fn.waterfall=function(x){
	return $.waterfall(x,this);
};
}(jQuery);