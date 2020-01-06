function scheduleY(obj) {
    var scheY = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "#2bd74c",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25",
    }
    if ($("#scheduleY").length === 1) {
        $("#scheduleY").append('<div class="yList"> <span class="yNum"></span></div>');
        if (scheY.again) {
            $(".yList").css("height", "0");
        }
        $("#scheduleY").css({
            "background-color": scheY.bgColor,
            "width": scheY.scWidth + "px",
            "height": scheY.scHeight + "px",
        })
        $(".yList").css("background-color", scheY.listColor)
        var num = 0;
        var numAll = Math.round(scheY.fulfill / scheY.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".yNum").html(num + "%")
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheY.speed)

        $(".yList").animate({"height": numAll + "%"}, scheY.speed * numAll)
    }
}
function scheduleX(obj) {
    var scheX = {
        fulfill: obj.fulfill || 55,
        listAll: obj.listAll || 100,
        speed: obj.speed || 25,
        again: obj.again || true,
        bgColor: obj.bgColor || "#7d8e91",
        listColor: obj.listColor || "#2bd74c",
        scWidth: obj.scWidth || "300",
        scHeight: obj.scHeight || "25",
    }
    if ($("#scheduleX").length === 1) {
        $("#scheduleX").append('<div class="xList"> <span class="xNum"></span></div>');
        if (scheX.again) {
            $(".xList").css("width", "0");
        }
        $("#scheduleX").css({
            "background-color": scheX.bgColor,
            "width": scheX.scWidth + "px",
            "height": scheX.scHeight + "px",
        })
        $(".xList").css("background-color", scheX.listColor)
        var num = 0;
        var numAll = Math.round(scheX.fulfill / scheX.listAll * 100);
        var xNumAll = setInterval(function () {
            num++;
            $(".xNum").html(num + "%")
            if (num == numAll) {
                clearInterval(xNumAll)
            }
        }, scheX.speed)

        $(".xList").animate({"width": numAll + "%"}, scheX.speed * numAll)
    }
}