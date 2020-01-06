
var preview = {
    fileType:'',
    fileBase64:'',
    /* 读取文件 */
    readFile:function(ev){
        /*获取事件源对象的文件集数组中的第一个*/
        var selectFile=ev.currentTarget.files[0];

        /*判断选择的文件类型是否为图片*/
        if(!/image/.test(selectFile.type)){
            alert("请选择图片");
            return;
        }

        var _this = this;
        /*获取图片方向 exif*/
        EXIF.getData(selectFile, function(){
            var Orientation = EXIF.getTag(this, 'Orientation');

            /*创建 FileReader 对象*/
            var fileRead=new FileReader();
            fileRead.readAsDataURL(selectFile);
            fileRead.onloadend=function () {
                _this.fileType = selectFile.type;
                _this.drawFile(this.result,Orientation);
            };
        });
    },
    /* 绘制文件 */
    drawFile:function(url,or){
        var _this = this;
        var image = new Image();
        image.src = url;

        var canvas = document.querySelector("#preview-canvas");
        var ctx = canvas.getContext("2d");


        /* 旋转绘制 */
        var rotateImage = function(img, dir, canvas, s){
            var dir = dir || 'right',
                s = s || 1;
            MIN_STEP = 0;
            MAX_STEP = 3;
            width = canvas.width || img.width;
            height = canvas.height || img.height;
            step = 0;

            if (dir === 'right') {
                step += s;
                step > MAX_STEP && (step = MIN_STEP);
            } else {
                step -= s;
                step < MIN_STEP && (step = MAX_STEP);
            }

            var degree = step * 90 * Math.PI / 180;

            switch (step) {
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height, width, height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height, width, height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0, width, height);
                    break;
                default:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    break;
            }
        };

        /* 绘制 */
        var draw = function(){
            /* 图片原始大小 */
            var width = image.width;
            var height = image.height;

            /* 图片尺寸缩放比 800 为基数 */
            if(width > 3200 || height > 3200){
                width = Math.floor(width/4);
                height = Math.floor(height/4);
            }else if(width > 2400 || height > 2400){
                width = Math.floor(width/3);
                height = Math.floor(height/3);
            }else if(width > 1600 || height > 1600){
                width = Math.floor(width/2);
                height = Math.floor(height/2);
            }

            canvas.width = width;
            canvas.height = height;

            /*canvas清屏*/
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            /* 将图像绘制到canvas上 */
            ctx.drawImage(image, 0, 0, width, height);

            switch (or) {
                case 6: /* 顺时针旋转90度 */
                    rotateImage(image, 'right', canvas);
                    break;
                case 8: /* 逆时针旋转90度 */
                    rotateImage(image, 'left', canvas);
                    break;
                case 3: /* 顺时针旋转180度 */
                    rotateImage(image, 'right', canvas, 2);
                    break;
                default:
                    break;
            }

            var quality = 0.85;  /* 压缩率 */
            /* "data:image/png;base64,"开头,需要在客户端或者服务器端将其去掉，后面的部分可以直接写入文件。*/
            var imgData = canvas.toDataURL(_this.fileType, quality);


            /* 生成预览 */
            document.querySelector("#preview-img").src = imgData;
        };

        /* 图像加载完成 */
        image.onload = function () {
            draw();
        };
    }
};


document.querySelector("#preview-file").addEventListener("change",function () {
    var e = e || window.event;
    preview.readFile(e);
},false);