/**
 * 默认画笔线宽
 * @type {number}
 */
var defaultStrokeWidth = 0.5; //画矩形选取框的线宽

/**
 * 选取划线的canvasExt
 * @type {{drawRect: canvasExt.drawRect}}
 */
var canvasExt = {
    /**
     *  画矩形
     * @param canvasId canvasId
     * @param penColor 画笔颜色
     * @param strokeWidth 线宽
     */
    drawRect: function (canvasId, penColor, strokeWidth) {
        var that = this;

        that.penColor = penColor;
        that.penWidth = strokeWidth;
        var canvas = document.getElementById(canvasId);
        //canvas 的矩形框
        var canvasRect = canvas.getBoundingClientRect();
        //canvas 矩形框的左上角坐标
        var canvasLeft = canvasRect.left;
        var canvasTop = canvasRect.top;

        // 要画的矩形的起点 xy
        var x = 0;
        var y = 0;

        //鼠标点击按下事件，画图准备
        canvas.onmousedown = function(e) {

            //设置画笔颜色和宽度
            var color = that.penColor;
            var penWidth = that.penWidth;
            // 确定起点
            var top = 0;
            var left = 0;
            if (document.body && document.body.scrollTop && document.body.scrollLeft)
            {
                top=document.body.scrollTop;
                left=document.body.scrollleft;   
            }
            if (document.documentElement && document.documentElement.scrollTop && document.documentElement.scrollLeft)
            {
                top=document.documentElement.scrollTop;
                left=document.documentElement.scrollLeft;
            }

            x = e.clientX - canvasLeft - left;
            y = e.clientY - canvasTop - top;
            // 添加layer
            $("#"+canvasId).addLayer({
                type: 'rectangle',
                strokeStyle: color,
                strokeWidth: penWidth,
                name:'areaLayer',
                fromCenter: false,
                x: x, y: y,
                width: 1,
                height: 1
            });
            // 绘制
            $("#"+canvasId).drawLayers();
            $("#"+canvasId).saveCanvas();

            //鼠标移动事件，画图
            canvas.onmousemove = function(e){

                // 要画的矩形的宽高
                var width = e.clientX-canvasLeft - x;
                var height = e.clientY-canvasTop - y;

                // 清除之前画的
                $("#"+canvasId).removeLayer('areaLayer');

                $("#"+canvasId).addLayer({
                    type: 'rectangle',
                    strokeStyle: color,
                    strokeWidth: penWidth,
                    name:'areaLayer',
                    fromCenter: false,
                    x: x, y: y,
                    width: width,
                    height: height
                });

                $("#"+canvasId).drawLayers();
            }
        };
        //鼠标抬起
        canvas.onmouseup=function(e){

            var color = that.penColor;
            var penWidth = that.penWidth;

            canvas.onmousemove = null;

            var width = e.clientX - canvasLeft - x;
            var height = e.clientY- canvasTop - y;

            $("#"+canvasId).removeLayer('areaLayer');

            $("#"+canvasId).addLayer({
                type: 'rectangle',
                strokeStyle: color,
                strokeWidth: penWidth,
                name:'areaLayer',
                fromCenter: false,
                x: x, y: y,
                width: width,
                height: height
            });

            $("#"+canvasId).drawLayers();
            $("#"+canvasId).saveCanvas();

            // 把body转成canvas
            html2canvas(document.body, {
                scale: window.devicePixelRatio,
                // allowTaint: true,
                useCORS: true  //跨域使用
            }).then(canvas => {
                var capture_x, capture_y
                if (width > 0) {
                    //从左往右画
                    capture_x = x + that.penWidth
                }else {
                    //从右往左画
                    capture_x = x + width + that.penWidth
                }
                if (height > 0) {
                    //从上往下画
                    capture_y = y + that.penWidth
                }else {
                    //从下往上画
                    capture_y = y + height + that.penWidth
                }
                printClip(canvas, capture_x, capture_y, Math.abs(width), Math.abs(height))
            });
            // 移除画的选取框
            $("#"+canvasId).removeLayer('areaLayer');
            // 隐藏用于华画取框的canvas
            $("#"+canvasId).hide()
            // canvas.parentNode.removeChild('canvas');
        }
    }
};

/**
 * 选取截屏
 * @param canvasId
 */
function clipScreenshots(canvasId){
    canvasExt.drawRect(canvasId, "red", defaultStrokeWidth);
}

/**
 * 打印截取区域
 * @param canvas 截取的canvas
 * @param capture_x 截取的起点x
 * @param capture_y 截取的起点y
 * @param capture_width 截取的起点宽
 * @param capture_height 截取的起点高
 */
function printClip(canvas, capture_x, capture_y, capture_width, capture_height) {
    // 创建一个用于截取的canvas
    var clipCanvas = document.createElement('canvas')
    clipCanvas.width = capture_width
    clipCanvas.height = capture_height
    // 截取
    clipCanvas.getContext('2d').drawImage(canvas, capture_x, capture_y, capture_width, capture_height, 0, 0, capture_width, capture_height)
    var clipImgBase64 = clipCanvas.toDataURL()
    // 生成图片
    var clipImg = new Image()
    clipImg.src = clipImgBase64
    floatwindow(clipImgBase64)
    /* var con = confirm('打印截图吗?取消则保存截图')
    if (con) {
        $(clipImg).print()
    }else {
        downloadIamge(clipImgBase64)
    } */
}

/**
 * 下载保存图片
 * @param imgUrl 图片地址
 */
function downloadIamge(imgUrl) {
    // 图片保存有很多方式，这里使用了一种投机的简单方法。
    // 生成一个a元素
    var a = document.createElement('a')
    // 创建一个单击事件
    var event = new MouseEvent('click')
    // 生成文件名称
    var timestamp = new Date().getTime();
    var name = imgUrl.substring(22, 30) + timestamp + '.png';
    a.download = name
    // 将生成的URL设置为a.href属性
    a.href = imgUrl;
    // 触发a的单击事件 开始下载
    a.dispatchEvent(event);
}

function floatwindow(imgUrl) {
    /* the elements used in the floating window
    */

    var dialog = document.createElement('div');
    var dialogtitlebar = document.createElement('div');
    var dialogbody = document.createElement('div');
    var dialogtitleimg = document.createElement('span');
    var dialogtitle = document.createElement('span');
    var dialogclose = document.createElement('span');
    var closeactioin = document.createElement('button');


    var img_to_translate = document.createElement('img');
    // img_to_translate.src = "chrome-extension://__MSG_@@extension_id__/../../../imgs/test.png";
    img_to_translate.src = imgUrl;
    // alert(img_to_translate.width);
    var removeable = true; 
    /* create an id for the float window, 
    it must be different from the existed id in the tab. 
    */
    dialog.id = "8822000012500";

    /* assembly dialog : titlebar    
    */

    dialogtitle.innerHTML = "MiniFanFanFan";
    dialogtitlebar.appendChild(dialogtitleimg);
    dialogtitlebar.appendChild(dialogtitle);
    dialogtitlebar.appendChild(dialogclose);
    dialogclose.appendChild(closeactioin);

    /* assembly dialog : bodycontent
    */
    var bodycontent = document.createElement('div');
    dialogbody.appendChild(bodycontent);
    bodycontent.appendChild(img_to_translate);
    dialogbody.appendChild(img_to_translate);
    /* assembly dialog : entire dialog
    */
    dialog.appendChild(dialogtitlebar);
    dialog.appendChild(dialogbody);

    /* css for the dialog
    */
    var templeft, temptop, tempheight, width, height
    var dialogcssText, dialogbodycssText;
    width = 500;
    height = 450+25;
    templeft = document.body.clientWidth - width;
    temptop = document.body.clientHeight - height;
    tempheight = height - 25;
    var img_exit = 'url(../../../imgs/close.png)'
    dialogcssText = "position:absolute;background:#9ca8b8;padding:1px;border:4px;top:"+temptop+"px;left:"+templeft+"px;height:"+height+"px;width:"+width+"px;"
    dialogbodycssText = "width:100%;background:#efeeee;height:"+tempheight+"px;";
    dialog.style.cssText = dialogcssText;
    dialogtitlebar.style.cssText = "height:25px;width:100%;background:#8696a7;";
    dialogbody.style.cssText = dialogbodycssText;
    dialogtitleimg.style.cssText = "float:left;height:20px;width:20px;background:url(../imgs/bubbles.png);"+"display:block;margin:4px;line-height:20px;"
    dialogtitle.style.cssText = "font-size:16px; float:left;display:block;margin:4px;line-height:20px;";
    dialogclose.style.cssText = "float:right;display:block;margin:2px;line-height:17px;";
    closeactioin.value = "X";
    closeactioin.innerHTML = "X";
    closeactioin.style.cssText = "height:17px;width:17px;border:1px solid transparent;background-color:#efeeee;border-color:#ececea;color:#8696a7;cursor:pointer;text-align:center;vertical-align:middle;border-radius:5px 2px;font-size:125%";
    // closeactioin.style.backgroundImage = url('../../../imgs/close.png')
    // closeactioin.style.backgroundImage = url('./imgs/close.png');
    dialog.style.zIndex = 9999;
    /* Register events for window elements
    */
    /* var dialogleft = parseInt(dialog.style.left);
    var dialogtop = parseInt(dialog.style.top);
    var ismousedown = false; */
    /* Events on the close button
    */
    closeactioin.onclick = function(){
        dialog.parentNode.removeChild(dialog);
    }
    /* To make the window removeable
    */
    /* if(removeable == true){
        var ismousedown = false;
        var dialogleft,dialogtop;
        var downX, downY;
        dialogleft = parseInt(dialog.style.left);
        dialogtop = parseInt(dialog.style.top);
        dialogtitlebar.onmousedown = function(e){
            if(ismousedown){
                dialog.style.top = e.clientY - downY + dialogtop + "px";
                dialog.style.left = e.clientX - downX + dialogleft + "px";
            }
        }

        // Calculate the new position of the window when mousedown
        
        document.onmouseup = function(){
            dialogleft = parseInt(dialog.style.left);
            dialogtop = parseInt(dialog.style.top);
            ismousedown = false;
        }    
    } */

    document.body.appendChild(dialog);

    /* var textNode = document.createTextNode("zzy");
    odiv.appendChild(textNode);
    odiv.style.zIndex = 9999;
    odiv.style.position = "absolute"
    odiv.style.width = '200px';
    odiv.style.height = '200px';
    odiv.style.backgroundColor = "red";
    odiv.style.color = "blue";
    odiv.style.textAlign = "center";
    odiv.style.right = '10px';
    odiv.style.bottom = '10px';
    odiv.style.overflow = "hidden"; */


    // 实现滑动功能
    window.onscroll = function(){
        var odiv = document.getElementById("8822000012500");
        //scrollTop 起始位置到末位置的滑动高度
        if (odiv != null){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滑动宽度/高度
            //documentElement.clientHeight 页面可视区宽高
            //oDiv.style.top = document.documentElement.clientHeight - oDiv.offsetHeight + scrollTop + 'px';		
            startMove(document.documentElement.clientHeight - odiv.offsetHeight + scrollTop);
        }
        
    }

    var timer = null;
    function startMove (iTarget){
        var odiv = document.getElementById("8822000012500");
        clearInterval(timer);
        timer = setInterval(function(){
        var speed = (iTarget - odiv.offsetTop)/4;
        speed = speed>0?Math.ceil(speed):Math.floor(speed);         
        
        if(odiv.offsetTop == iTarget){
            clearInterval(timer);
        }
        else{
            odiv.style.top = odiv.offsetTop + speed + 'px';
        }
        },30);    
    }
}