$(document).ready(function () {
	var jQueryEventFix = $.event.fix;
		$.event.fix = function (event) {
			var offset, originalEvent, touches;
			event = jQueryEventFix.call($.event, event);
			originalEvent = event.originalEvent;
			var jcanvasScale = 1;
			// console.log(originalEvent)
			// originalEvent does not exist for manually-triggered events
			if (originalEvent) {
				//判断是否是手指在屏幕上滑动时
				if(originalEvent.type == 'touchmove') originalEvent.preventDefault();//防止阻止ios屏幕滑动失效
				var target = originalEvent.target;
				// console.log(target);
				// console.log(target.tagName);
				// if(target.tagName == 'CANVAS' && target.getAttribute('jcanvasScale')){
				// 	jcanvasScale = parseInt(target.getAttribute('jcanvasScale'));
				// }//edn if
				touches = originalEvent.changedTouches;
				// If offsetX and offsetY are not supported, define them
				if (event.pageX !== undefined && event.offsetX === undefined) {
					offset = $(event.currentTarget).offset();
					try {
						if (offset) {
							event.offsetX = (event.pageX - offset.left)*jcanvasScale;
							event.offsetY = (event.pageY - offset.top)*jcanvasScale;
						}
					} catch (error) {
						// Fail silently
					}
				} else if (touches) {
					try {
						// Enable offsetX and offsetY for mobile devices
						offset = $(event.currentTarget).offset();
						if (offset) {
							event.offsetX = (touches[0].pageX - offset.left)*jcanvasScale;
							event.offsetY = (touches[0].pageY - offset.top)*jcanvasScale;
						}
					} catch (error) {
						// Fail silently
					}
				}

			}
			return event;
		};

	//-----------------------------------------定义和初始化变量----------------------------------------
	var imgScaleMin = 0.5,
		imgScaleMax = 2;
	var elelayer;
	var widthOrg, heightOrg;

	pageInit();

	function pageInit(){
		$('article').css("opacity", "1").fadeIn();
		$('.myphoto .btn-choose').on('click', btnNext);
		$('.congratulate p').on('click', confirmTitle);
	}

	//----------------------------------------页面逻辑代码----------------------------------------

	//下一步
	function btnNext() {
		$('.congratulate').show();
	}

	//确定一个title
	var itemList = []; //储存item对象
	var increaseId = 0; //自增id
	var selectId = 0; //当前选取的id
	var item = {}; //当前选取的对象
	function confirmTitle() {
		// console.log(icom)
		increaseId++;
		var left = ($(window).width() - 209) / 2; //初始化定位
		var top = ($(window).height() - 209) / 2;

		$('.congratulate').fadeOut();
		// $(".myphoto .imgbox").html("");
		//添加图片编辑事件
		// elelayer=$('<span class="move active" > <a class="close"></a><a class="rotate"></a><a class="resize"></a></span>').appendTo(".myphoto .imgbox");
		elelayer = $('<span data-id=' + increaseId + ' class="move active" style="left:' + left + 'px;top:' + top + 'px"> <a class="close"></a><a class="rotate"></a></span>').appendTo(".myphoto .imgbox");
		var id = $(this).data("id");
		console
		var src = $(this).find("img").attr("src");
		// console.log($(this));
		imgChild = $('<img/>').attr({
			src: src
		}).appendTo(elelayer).addClass("wid" + id);
		// var x = $(this).offset().left;
		// var y = 300;
		widthOrg = elelayer.find("img").width();
		heightOrg = elelayer.find("img").height();
		// console.log(widthOrg)
		// console.log(heightOrg)

		var data = {
			id: increaseId,
			width: widthOrg,
			height: heightOrg,
			tx: 0, //move触摸点
			ty: 0,
			_tx: 0, //触摸距离
			_ty: 0,
			rx: 0, //rotate触摸点
			ry: 0,
			_rx: 0, //触摸距离
			_ry: 0,
			disPtoO: 0, //触摸点到圆心的距离
			scale: 1, //缩放比例
			left: left,
			top: top,
			anglePre: 0, //角度
			angleNext: 0,
			rotate: 0, //计算得出真正的旋转角度
			ox: left + widthOrg / 2, //圆心坐标
			oy: top + heightOrg / 2,
			r: Math.sqrt(widthOrg * widthOrg + heightOrg * heightOrg) / 2 //对角线的半
		}
		itemList[itemList.length] = data;
		// console.log($(".imgbox").find('.move'))
		console.log(data.left)
	}


	$('.imgbox').on("touchstart", '.rotate ', function (e) {
		selectId = $(this).parent().attr('data-id');
		// console.log(selectId, itemList)
		itemList.forEach(function (currentValue) {
			if (selectId == currentValue.id) {
				item = currentValue
			}
		})
		// console.log(item)
		e.preventDefault();
		item.rx = e.offsetX;
		item.ry = e.offsetY;
		// console.log(item.ox, item.oy, e.offsetX, e.offsetY)
		item.anglePre = getAngle(item.ox, item.oy, e.offsetX, e.offsetY);
		// item.anglePre = countDeg()
	})

	$('.imgbox').on("touchmove", '.rotate', function (e) {
		// console.log(e)
		e.preventDefault();
		item.disPtoO = getDistancs(item.ox, item.oy, e.offsetX, e.offsetY);
		item.scale = (item.disPtoO / item.r).toFixed(2); //保留两位小数
		if (item.scale >= imgScaleMax) item.scale = imgScaleMax
		if (item.scale <= imgScaleMin) item.scale = imgScaleMin
		// 父元素放大
		item.angleNext = getAngle(item.ox, item.oy, e.offsetX, e.offsetY);
		item.rotate += item.angleNext - item.anglePre;
		// console.log(item.rotate)
		$(this).parent().css({scale: item.scale,rotate: item.rotate});
		// 子元素按钮缩小
		$(this).css({
			scale: 1 / item.scale
		}).parent().find('.close').css({
			scale: 1 / item.scale
		})
		item.anglePre = item.angleNext;


	})


	$(".imgbox").on('touchstart', '.move img', function (e) {
		selectId = $(this).parent().attr('data-id');

		$(".move").removeClass('active');
		$(this).parents(".move").addClass('active');
		itemList.forEach(function (currentValue) {
			if (selectId == currentValue.id) {
				item = currentValue
			}
		})
		item.tx = e.offsetX;
		item.ty = e.offsetY;
		console.log(e)
	})




	$(".imgbox").on('touchmove', '.move img', function (e) {
		item._tx = e.offsetX - item.tx;
		item._ty = e.offsetY - item.ty;
		item.left += item._tx;
		item.top += item._ty;
		$(this).parent().css({
			left: item.left,
			top: item.top
		})
		// 重新赋值
		item.ox = +item.left + item.width / 2;
		item.oy = +item.top + item.height / 2;
		item.tx = e.offsetX;
		item.ty = e.offsetY;
	})

	$(".imgbox").on('touchend', '.move img', function (e) {
		itemList.forEach(function (currentValue) {
			if (selectId == currentValue.id) {
				currentValue = item;
			}
		})
	})

	$(".imgbox").on('touchend', '.close', function (e) {
		$(this).parents(".move").remove()
	})


	function getAngle(px, py, mx, my) {
		// console.log(px, py, mx, my)
		var x = px - mx;
		var y = py - my;
		var angle = Math.atan2(y, x) * 360 / Math.PI;
		return angle;
	}

	function getDistancs(cx, cy, pointer_x, pointer_y) {
		var ox = pointer_x - cx;
		var oy = pointer_y - cy;
		return Math.sqrt(
			ox * ox + oy * oy
		);
	}

	
    //禁止页面滑动
    $(".preventDefault").on("touchmove", function(e){
      e.preventDefault();
    })

}); //end ready