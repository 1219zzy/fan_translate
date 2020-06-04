// alert('crop.js!');
bg_canvas517021910665 = document.getElementById("bg_canvas517021910665")
if (bg_canvas517021910665 != null){
    bg_canvas517021910665.parentNode.removeChild(bg_canvas517021910665);
}
if (document.getElementById("8822000012500") != null) {
    let dialog = document.getElementById("8822000012500");
    dialog.parentNode.removeChild(dialog);
}
var bg_canvas517021910665 = document.createElement("canvas");

bg_canvas517021910665.id = "bg_canvas517021910665";
bg_canvas517021910665.style.height= "100%";
bg_canvas517021910665.style.width = "100%";
bg_canvas517021910665.style.position = 'absolute';
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
bg_canvas517021910665.style.top = top;
bg_canvas517021910665.style.left = left;
bg_canvas517021910665.style.zIndex = 9999;
// alert(bg_canvas517021910665.id)
// bg_canvas.style.color = 'red';
/* let bg_canvas_ctx517021910665 = bg_canvas517021910665.getContext('2d');
if(bg_canvas_ctx517021910665 != null){
    bg_canvas_ctx517021910665.fillStyle="#9ca8b8";
    bg_canvas_ctx517021910665.fillRect(50,50,100,100);
}
 */
bg_canvas517021910665.style.backgroundColor = '#9ca8b8';
if(bg_canvas517021910665 != null){
    document.body.appendChild(bg_canvas517021910665);
}

// alert('crop');
$(function () {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    // 更新canvas宽高
    // alert('function');
    
    $("#bg_canvas517021910665").attr("width", clientWidth);
    $("#bg_canvas517021910665").attr("height", clientHeight);
    //$("#bg_canvas517021910665").hide();
    //$("#bg_canvas517021910665").show();
    $("#bg_canvas517021910665").attr("backgroundColor", "#9ca8b8");
    alert('现在你可以使用鼠标拖拽选取打印区域，松开后完成')
    //调用选取截屏
    // clipScreenshots("bg_canvas517021910665");
    // bg_canvas517021910665.parentNode.removeChild(bg_canvas517021910665);

});

/* var dialog = document.createElement('div');
var templeft, temptop, tempheight, width, height
var dialogcssText, dialogbodycssText;
width = 500;
height = 450+25;
templeft = document.body.clientWidth - width;
temptop = document.body.clientHeight - height;
tempheight = height - 25;
dialog.style.zIndex = 9999;
dialog.style.cssText = "position:absolute;background:#9ca8b8;padding:1px;border:4px;top:"+temptop+"px;left:"+templeft+"px;height:"+height+"px;width:"+width+"px;";
document.body.appendChild(dialog); */