/* 1°从background.js获得屏幕截图；
   2°在被注入的页面新建一个canvas，将获得的截图打印在canvas中；
 */
// alert("ahh");
var original_language;
var translated_language;
chrome.storage.sync.get((config) => { 
    if(config.original_language == 'chinese'){
        original_language = "chs";
    }
    else if (config.original_language == 'japanese'){
        original_language = "jpn";
    }
    else if (config.original_language == 'english'){
        original_language = "eng";
    }
    if(config.translated_language == 'chinese'){
        translated_language = "zh";
    }
    else if (config.translated_language == 'japanese'){
        translated_language = "jp";
    }
    else if (config.translated_language == 'english'){
        translated_language = "en";
    }  
});

var dialog = document.getElementById("8822000012500");
if(dialog != null){
    dialog.parentNode.removeChild(dialog);
    delete(dialog);
}
var img_screenshot = document.getElementById("img_517021910665");
if (img_screenshot != null){
    img_screenshot.parentNode.removeChild(img_screenshot);
    delete(img_screenshot);
}
var img_screenshot = document.createElement('img');
img_screenshot.id = "img_517021910665";
document.body.appendChild(img_screenshot);
img_screenshot.hidden = 1;
chrome.extension.sendRequest({greeting: "hello"}, function(response) {
    img_screenshot.src = response.farewell;
});

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

// document.appendChild(img_screenshot);

/* alert(document.documentElement.scrollTop);
alert(document.body.scrollLeft); */
/* 在界面新建一个canvas画布元素 
 */

var bg_canvas517021910665 = document.getElementById("bg_canvas517021910665")
if (bg_canvas517021910665 != null){
    bg_canvas517021910665.parentNode.removeChild(bg_canvas517021910665);
    delete(bg_canvas517021910665);
}

var bg_canvas517021910665 = document.createElement("canvas");

bg_canvas517021910665.id = "bg_canvas517021910665";
bg_canvas517021910665.style.height= "100%";
bg_canvas517021910665.style.width = "100%";
bg_canvas517021910665.style.position = 'absolute';
/* var top = 0;
var left = 0; */
bg_canvas517021910665.style.top = document.documentElement.scrollTop+'px';
bg_canvas517021910665.style.left = document.body.scrollLeft+'px';
bg_canvas517021910665.style.zIndex = 9999;


document.body.appendChild(bg_canvas517021910665);

var imgW = '';
var imgH = '';

var autoImg = document.createElement("canvas");
var ctx2 = autoImg.getContext('2d');
ctx2.canvas.width = bg_canvas517021910665.clientWidth;
ctx2.canvas.height = bg_canvas517021910665.clientHeight;
img_screenshot.onload = function(){
    /* var pattern = ctx_bg_canvas517021910665.createPattern(img_screenshot, "repeat");
    ctx_bg_canvas517021910665.fillStyle = pattern;
    ctx_bg_canvas517021910665.fillRect(0, 0, bg_canvas517021910665.width, bg_canvas517021910665.height); */
    // img_screenshot.width = bg_canvas517021910665.width;
    // alert(img_screenshot.width);
    img_screenshot.style.left = 0;
    img_screenshot.style.top = 0;
    img_screenshot.style.zIndex = 10000;
    // document.body.appendChild(img_screenshot);
    imgW = img_screenshot.width;
    imgH = img_screenshot.height;
    /* console.log(imgW);
    console.log(imgH);
    console.log(bg_canvas517021910665.clientWidth);
    console.log(bg_canvas517021910665.clientHeight); */
    var ctx_bg_canvas517021910665 = bg_canvas517021910665.getContext('2d');
    // alert(imgW);
    /* var hRatio = bg_canvas517021910665.width / imgW;
    var vRatio = bg_canvas517021910665.height / imgH;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (bg_canvas517021910665.width - imgW*vRatio)/2;
    var centerShift_y = (bg_canvas517021910665.height - imgH*hRatio)/2; */

    /* var oImg = imgW.set({width:})
    ctx2.drawImage(this, 0, 0, ctx2.canvas.width, ctx2.canvas.height);
    var pattern = ctx_bg_canvas517021910665.createPattern(autoImg, 'no-repeat');
    ctx_bg_canvas517021910665.fillStyle = pattern;
    ctx_bg_canvas517021910665.fillRect(0, 0, bg_canvas517021910665.clientWidth, bg_canvas517021910665.clientHeight); */
    /* this.width = bg_canvas517021910665.clientWidth;
    this.height = bg_canvas517021910665.clientHeight;*/
    // ctx_bg_canvas517021910665.drawImage(img_screenshot, 0, 0, imgW, imgH,centerShift_x, centerShift_y, this.width*ratio, this.height*ratio); 
    var div_517021910665 = document.getElementById("div_517021910665");
    if(div_517021910665 != null){
        div_517021910665.parentNode.removeChild(div_517021910665);
        delete(div_517021910665);
    }
    var div_517021910665 = document.createElement('div');
    div_517021910665.id = "div_517021910665";
    div_517021910665.style.left = document.body.scrollLeft+'px';
    div_517021910665.style.top = document.documentElement.scrollTop+'px';
    div_517021910665.style.position = "absolute";
    div_517021910665.style.border = "1.5px dashed rgb(148, 184, 184)";

    document.body.appendChild(div_517021910665);


    let div = document.getElementById('div_517021910665');
    div.hidden = 1;
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    let image = document.getElementById("img_517021910665");
    let canvas = document.getElementById("bg_canvas517021910665");

    /* var img_cropped_517021910665 = document.getElementById("img_cropped_517021910665");
    if(img_cropped_517021910665 != null){
        img_cropped_517021910665.parentNode.removeChild(img_cropped_517021910665);
    }
    var  img_cropped = document.createElement("img");
    img_cropped.id = "img_cropped_517021910665";
    img_cropped.src =  crop_image(div, canvas, image, x1, y1, x2, y2); */

    crop_image(div, canvas, image, x1, y1, x2, y2);
    
    // floatwindow(this.src);    
}





function crop_image(div, canvas, image, x1, y1, x2, y2){
   
    // make the div visible and save the starting x and y coordinates

    canvas.onmousedown = event => {
        div.hidden = 0;
        x1 = event.clientX;
        y1 = event.clientY;
        calculate();
    }

    // get the new x and y coordinates and calculate width and height
    canvas.onmousemove = event => {
        x2 = event.clientX;
        y2 = event.clientY;
        calculate();
    }

    // make the div hidden again and draw the cropped image area
    canvas.onmouseup = event => {
        
        div.style.display = 'none';
        let left = parseInt(div.style.left, 10) - document.documentElement.scrollLeft;
        let top = parseInt(div.style.top, 10) - document.documentElement.scrollTop;
        let width = parseInt(div.style.width, 10);
        let height = parseInt(div.style.height, 10);
        if (width != height) {
            draw(left, top, width, height);
        }
       
    }
    
    const draw = (left, top, width, height) => {
    
        // get canvas context and set width and height
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        // alert(canvas.width);
        // alert(document.body.clientWidth);
        // alert(img_screenshot.width);
        var pix_width = img_screenshot.width / document.documentElement.clientWidth;
        // alert(img_screenshot.height);
        // alert(document.documentElement.clientHeight);
        var pix_height = img_screenshot.height / document.documentElement.clientHeight;
        // alert(pix_width);
        // alert(pix_height);
        // draw the cropped image and turn the canvas into an image
        ctx.drawImage(img_screenshot, (parseFloat(pix_width)-0.02)*left, parseFloat(pix_height)*top, (parseFloat(pix_width)-0.02)*width, parseFloat(pix_height)*height, 0, 0, width, height);
        // document.write('<img src="'+ canvas.toDataURL("croppedImage/png") +'"/>');
        
        // processText(canvas.toDataURL("croppedImage/png"));
        // alert(img_screenshot.src);
        // alert(canvas.toDataURL("croppedImage/png"));
        
        image.hidden = 1;
        canvas.hidden = 1;
        floatwindow(canvas.toDataURL("croppedImage/png"));
        /* if(canvas != null){
            canvas.parentNode.removeChild(canvas);
        } */
        // return (canvas.toDataURL("croppedImage/png"));
        
    }

    // calculate the position and size of the div
    const calculate = () => {
        let x3 = Math.min(x1,x2);
        let x4 = Math.max(x1,x2);
        let y3 = Math.min(y1,y2);
        let y4 = Math.max(y1,y2);
        div.style.left = x3 + document.documentElement.scrollLeft + 'px';
        div.style.top = y3 + document.documentElement.scrollTop +'px';
        div.style.width = x4 - x3 + 'px';
        div.style.height = y4 - y3 + 'px';
    }


}





function floatwindow(imgUrl) {
    /* the elements used in the floating window
    */
    var dialog = document.getElementById("8822000012500")
    if(dialog != null){
        dialog.parentNode.removeChild(dialog);
        delete(dialog);
    }
    var dialog = document.createElement('div');
    /* create an id for the float window, 
    it must be different from the existed id in the tab. 
    */
    dialog.id = "8822000012500";

    var dialogtitlebar = document.createElement('div');
    var dialogbody = document.createElement('div');
    var dialogtitleimg = document.createElement('span');
    var dialogtitle = document.createElement('span');
    var dialogclose = document.createElement('span');
    var closeactioin = document.createElement('button');
    var closeactioin_title = document.createElement('span');
    var text_ocr_result = document.createElement('span');
    var text_translated = document.createElement('span');
    var table = document.createElement('table');
    var tr_img = document.createElement('tr');
    var tr1 = document.createElement('tr');
    var tr2 = document.createElement('tr');
    var td_img1 = document.createElement('td');
    var td_img2 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var disp_ori = document.createElement('span');
    var disp_trans = document.createElement('span');
    var img_to_translate = document.createElement('img');
    // img_to_translate.src = "chrome-extension://__MSG_@@extension_id__/../../../imgs/test.png";
    img_to_translate.src = imgUrl;
    // alert(img_to_translate.src);
    /* chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            if (request.greeting == "img"){
                alert(request.text_ocr);
                sendResponse({farewell:"has get"});
            }
        }); */
    processText(img_to_translate.src, td2, td4, original_language);
    // alert(img_to_translate.width);
    var removeable = true; 
    

    /* assembly dialog : titlebar  组装会话框标题栏  
    */

    dialogtitle.innerHTML = "小凡翻翻";
    // dialogtitlebar.appendChild(dialogtitleimg);
    dialogtitlebar.appendChild(dialogtitle);
    dialogtitlebar.appendChild(dialogclose);
    dialogclose.appendChild(closeactioin);

    // dialogbody.appendChild(text_ocr_result);
    /* assembly dialog : bodycontent
    */
    var bodycontent = document.createElement('div');
    dialogbody.appendChild(bodycontent);
    bodycontent.appendChild(table);
    table.appendChild(tr_img);
    table.appendChild(tr1);
    table.appendChild(tr2);
    tr_img.appendChild(td_img1);
    tr_img.appendChild(td_img2);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr2.appendChild(td3);
    tr2.appendChild(td4);
    // mode: 截出的图片的长宽比决定了窗口的排版形式
    var mode;
    img_to_translate.onload = function(){
        if (img_to_translate.width < img_to_translate.height){
            mode = 0;
        }
        else
        {
            mode = 1;
        }

    }
    
    td_img2.appendChild(img_to_translate);
    td_img1.innerHTML = "img";
    // bodycontent.appendChild(text_translated);
    // bodycontent.appendChild(text_ocr_result);
    // dialogbody.appendChild(img_to_translate);
    /* assembly dialog : entire dialog
    */
    dialog.appendChild(dialogtitlebar);
    dialog.appendChild(dialogbody);

    /* css for the dialog
    */
    var templeft, temptop, tempheight, width, height
    var dialogcssText, dialogbodycssText;
    width = 350;
    height = 150+25;
    templeft = document.documentElement.clientWidth - width;
    temptop = document.documentElement.clientHeight + document.documentElement.scrollTop - height;
    tempheight = height - 25;
    var img_exit = 'url(../../../imgs/close.png)';
    dialogcssText = "position:absolute;background:#EAF2D3;padding:1px;border:4px;top:"+temptop+"px;left:"+templeft+"px;height:"+height+"px;width:"+width+"px;"
    dialogbodycssText = "width:100%;background:#ffffff;height:"+tempheight+"px;";
    dialog.style.cssText = dialogcssText;
    dialogtitlebar.style.cssText = "height:25px;width:100%;background:#11bdba;";
    dialogbody.style.cssText = dialogbodycssText;
    // dialogtitleimg.style.cssText = "float:left;height:20px;width:20px;background:url(../imgs/bubbles.png);"+"display:block;margin:4px;line-height:20px;"
    dialogtitle.style.cssText = "font-size:12px; float:left; display:block; margin:4px; line-height:20px;";
    dialogclose.style.cssText = "float:right;display:block;margin:2px;line-height:17px;";
    // closeactioin.value = "X";
    closeactioin_title.innerHTML = "X";
    closeactioin.appendChild(closeactioin_title);
    closeactioin_title.style.cssText = "display:block; margin:1px; float:middle;vertical-align:middle";
    closeactioin.style.cssText = "height:17px;width:17px;border:1px solid transparent;background-color:#efeeee;border-color:#ececea;color:#8696a7;cursor:pointer;text-align:center;vertical-align:middle;border-radius:5px 2px;font-size:125%";
    
    table.style.cssText = "width:350px;height:70px;";
    tr_img.style.cssText = "display:table-row;height:70px;width:350px;";
    td_img1.style.cssText = "width:20px;height:70px;text-align:left;vertical-align:middle;table-layout:fixed;display:table-cell;";
    td_img2.style.cssText = "width:330px;height:70px;text-align:left;vertical-align:middle;table-layout:fixed;display:table-cell;";
    tr1.style.cssText = "display:table-row;height:30px;";
    tr2.style.cssText = "display:table-row;height:30px;";
    td1.style.cssText = "width:20px;height:30px;text-align:left;vertical-align:middle;table-layout:fixed;display:table-cell;";
    td2.style.cssText = "width:290px;height:30px;text-align:left;vertical-align:middle;table-layout:fixed;display:table-cell;";
    td3.style.cssText = "width:20px;height:30px;text-align:left;vertical-align:middle;table-layout:fixed;display:table-cell;";
    td4.style.cssText = "width:290px;height:30px;text-align:left;vertical-align:middle;table-layout:fixed;display:table-cell;";
    disp_ori.cssText = "width:290px;height:30px;display:block;float:left;";
    disp_trans.cssText = "width:290px;height:30px;display:block;float:left;";
    td1.innerHTML = "原文：";
    td3.innerHTML = "译文：";
    td2.appendChild(disp_ori);
    td4.appendChild(disp_trans);
    // text_translated.style.cssText = "width:"
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
            startMove(document.documentElement.clientHeight - odiv.offsetHeight + scrollTop - 10);
        }
        
    }

    var timer = null;
    function startMove (iTarget){
        var odiv = document.getElementById("8822000012500");
        clearInterval(timer);
        timer = setInterval(function(){
        var speed = (iTarget - odiv.offsetTop)/2;
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

function processText(img_url, text_ocr_result, text_translated, original_language){

    var formData = new FormData();
    // alert(img_url);
    formData.append("base64Image",img_url);
    formData.append("language",original_language);
    formData.append("apikey",'2bc291044988957');
    formData.append("isOverlayRequired",true);
    var testo;
    //alert('try to ocr.');
    jQuery.ajax({
        url:"https://api.ocr.space/parse/image",
        data:formData,
        dataType:'json',
        cache:false,
        contentType:false,
        processData:false,
        type:'POST',
        success: function(ocrParsedResult){
            var parsedResults = ocrParsedResult["ParsedResults"];
            var ocrExitCode = ocrParsedResult["OCRExitCode"];
            var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
            var errorMessage = ocrParsedResult["ErrorMessage"];
            var errorDetails = ocrParsedResult["ErrorDetails"];
            var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
            if (parsedResults!=null){
                $.each(parsedResults,function(index,value){
                    var exitCode = value["FileParseExitCode"];
                    var parsedText = value["ParsedText"];
                    var errorMessage = value["ParsedTextFileName"];
                    var errorDetails = value["ErrorDetails"];
                    var textOverlay = value["TextOverlay"];
                    var pageText = '';
                    switch (+exitCode) {
                        case 1:
                        pageText = String(parsedText).replace(/\ +/g,"").replace(/[\r\n]/g,"");
                        // alert(pageText);
                        text_ocr_result.innerText = pageText;
                        chrome.extension.sendRequest({greeting: "text_ocr", text_ocr: pageText}, function(response) {
                            // alert(response.farewell);
                            text_translated.innerText = response.farewell;
                        });
                        /* chrome.runtime.sendMessage({ greeting:"text_ocr", text_ocr: pageText }, function (response) {
                            if (response.re) {
                                translation = response.re;
                                alert(translation);
                            }
                        }); */
                        //mreturn(pageText);                     
                        // translate_Yandex(pageText);
                        break;
                        case 0:
                        case -10:
                        case -20:
                        case -30:
                        case -99:
                        default:
                        pageText += "Error: " + errorMessage;
                        // return(pageText);
                        break;
                    }
                    /*$.each(textOverlay["Lines"], function (index, value) {
                        if (index == 2){
                            testo = value.Words[0].WordText;
    
                            $("#preview").val(testo);
                                  
                            
                            
                        }
                        console.log(value);
                });*/
            });
        };
    }
    });
  };


