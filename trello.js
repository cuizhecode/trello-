//for循环所有的li，通过滑动距离减去li距离顶部的长度，判断(0<i<该li的高度)。
$(document).ready(function() {
	var mouse_x = "";
	var mouse_y = "";
	var self = "";
	var self_html = "";
	this_index_lv = "";
	this_index_lv2 = "";
	$("ul").on("mousedown", "li", function() { //给所有的li监听一个mousedown事件
		self = $(this);
		self_html = $(self).html(); //获取当前点击元素下的所有节点元素
		$(document).mousemove(function(e) {
			mouse_x = e.pageX;
			mouse_y = e.pageY;
			$(self).css({
				"position": "absolute", //只付给当前点击元素position
				"top": mouse_y - 30,
				"left": mouse_x - 125
			});
			this_index_lv = Math.ceil(mouse_x / 270);
			this_index_lv2 = Math.ceil(mouse_x / 270) - 1;
			for(var i = 0; i < $(".cui_trelloContent ul:eq(" + this_index_lv2 + ") li").length; i++) { //观察移动时距离头部的距离
				current_Top = $(".cui_trelloContent ul:eq(" + this_index_lv2 + ") li:eq(" + i + ")").offset().top; //获取ul1的所有li距离顶部的距离
				$(".cui_trelloContent ul:eq(" + this_index_lv2 + ") li:eq(" + i + ")").attr("affter_top", mouse_y - current_Top); //鼠标y轴坐标减去li距离顶部距离的值
				$(self).removeAttr("affter_top");
			}
		});
		//当鼠标左键抬起来时发生的函数
		$(document).mouseup(function() {
			this_index_lv3 = $(".cui_trelloContent ul").length;
			if(this_index_lv * 270 > mouse_x && mouse_x > this_index_lv * 270 - 20 || mouse_x > this_index_lv3 * 270) { //所有ul列表以外的空隙
				$(self).attr("style", " "); //使之前动态定义的样式为空，原回到最初的样式
				$(document).unbind();
			} else {
				if(mouse_y > $(".cui_trelloContent ul:eq(" + this_index_lv2 + ")").height()) {
					$(self).attr("style", " "); //使之前动态定义的样式为空，原回到最初的样式
					$(document).unbind();
				} else {
					for(var i = 0; i < $(".cui_trelloContent ul:eq(" + this_index_lv2 + ") li").length; i++) { //遍历列表每一个li,符合条件的就执行
						current_Top = $(".cui_trelloContent ul:eq(" + this_index_lv2 + ") li:eq(" + i + ")").offset().top; //获取ul2的所有li距离顶部的距离
						subtraction = $(".cui_trelloContent ul:eq(" + this_index_lv2 + ") li:eq(" + i + ")").attr("affter_top"); //获取鼠标y轴坐标减去li距离顶部距离的值(通过设置属性并获取属性来在不同函数之间传值)
						current_li_height = $(".cui_trelloContent ul:eq(" + this_index_lv2 + ") li:eq(" + i + ")").height();
						if(subtraction >= 0 && subtraction <= current_li_height) {
							$(".cui_trelloContent ul:eq(" + this_index_lv2 + ") li:eq(" + i + ")").before("<li>" + self_html + "</li>");
							$(self).remove();
							$(document).unbind(); //移除document的所有绑定事件
							return
						}
					}
				}
			}
		});
	});
});