$(function () { 
    var hgS1 = new selectSwiper({ el: '.select_box1', data: ['吃饭', '睡觉', '打豆豆'], init: function (index) { if (index !== -1) { $('.btn1').html(this.data[index]); } }, okFunUndefind: function () { alert('必须选择一项'); return false; }, okFun: function (index) { console.log(index); $('.btn1').html(this.data[index]); }, closeFun: function () { console.log('取消'); }, });
     $('.btn1').on('click', function () { 
            hgS1.openSelectSwiper(); 
        }); 
    var hgS2 = new selectSwiper({ 
        el: '.select_box2', 
        mustSelect: true, 
        activeIndex: 0, 
        data: ['哈哈2', '呵呵2', '嘻嘻2', '嘿嘿2', '呼呼2', '咳咳2', '嘘嘘2'], 
        init: function (index) { 
            if (index !== -1) { $('.btn2').html(this.data[index]); } 
        }, 
        okFunUndefind: function () { 
            alert('必须选择一项'); 
        }, 
            okFun: function (index) { 
            	$('.btn2').html(this.data[index]); 
            }, 
            closeFun: function () { console.log('取消'); }, 
        }); 
        $('.btn2').on('click', function () { hgS2.openSelectSwiper(); }); 
        var hgS3 = new selectSwiper({ 
            el: '.select_box3',
            mustSelect: true, 
            activeIndex: 5, 
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'], 
            init: function (index) { 
                if (index !== -1) { $('.btn3').val(this.data[index]); } }, 
            okFunUndefind: function () { alert('必须选择一项'); return false; }, 
            okFun: function (index) { $('.btn3').val(this.data[index]); }, closeFun: function () { console.log('取消'); }, }); 
        $('.btn3').on('click', function () { hgS3.openSelectSwiper(); }); });