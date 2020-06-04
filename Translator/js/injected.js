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
img_to_translate.src = "chrome-extension://__MSG_@@extension_id__/../../../imgs/test.png";
img_to_translate.width = "400px";
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