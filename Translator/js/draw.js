"use strict";

document.write("<script language='javascript' src='jquery-3.3.1.min.js'></script>");
let image = document.getElementById("img_517021910665");
let canvas = document.getElementById("bg_canvas517021910665");

const draw = (left, top, width, height) => {
    
    // get canvas context and set width and height
    let ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    
    // draw the cropped image and turn the canvas into an image
    ctx.drawImage(image, 1.526*left, 1.526*top, 1.526*width, 1.526*height, 0, 0, width, height);
    document.write('<img src="'+ canvas.toDataURL("croppedImage/png") +'"/>');
    // processText(canvas.toDataURL("croppedImage/png"));

    image.hidden = 1;
}
function processText(img_url){
    var formData = new FormData();
    formData.append("base64Image",img_url);
    formData.append("language","jpn");
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
                        //alert(pageText);
                        translate_Yandex(pageText);
                        break;
                        case 0:
                        case -10:
                        case -20:
                        case -30:
                        case -99:
                        default:
                        pageText += "Error: " + errorMessage;
                        alert(pageText);
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

function translate_Yandex(text){
    var API_KEY = "trnsl.1.1.20200329T061930Z.a04b01462fe5b04a.a2c3e5bdd7dac4d7a93d16f38212f1336996a854";
    var YANDEX_TRANSLATE_API_URL = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    $.ajax({
    url: YANDEX_TRANSLATE_API_URL,
    method: "GET",
    dataType: "JSON",
    data: {
    key: API_KEY,
    text: text,
    lang: "ja-en"
    },
    success:function(response){
        var translateYandex = response.text[0];
        //alert(translateYandex);
        $.ajax({
        url: YANDEX_TRANSLATE_API_URL,
        method: "GET",
        dataType: "JSON",
        data: {
        key: API_KEY,
        text: text,
        lang: "ja-zh"
        },
        success:function(response){
            var translation = response.text[0];
            chrome.notifications.create(
                Math.random()+'',
                {
                    type:'list',
                    iconUrl:'icon.png',
                    title: 'OCR & Translation',
                    items:[{title:'原文:',message:text},{title:'译文(en):',message:translateYandex},{title:'译文(zh)',message:translation}],
                    eventTime:Date.now()+1000,
                    message:'OCR & Translation',
                    contextMessage:'ComicTranslator'
                }
            );
           /*var notification = new Notification('OCR & Transaltion',{
                type:"list",
                icon:'icon.png',
                body:"原文:"+text+"\n"+"译文(en):"+translateYandex+"\n"+"译文(zh):"+translation,
                eventTime: Date.now()+2000
            });*/
            //alert(translateYandex +'\n'+ translation);
        }
        });
    }
    });
    
    

    
}