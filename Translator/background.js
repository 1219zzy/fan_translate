var imgSrc = null;
/* chrome.runtime.onInstalled.addListener(function (details) {
  chrome.browserAction.onClicked.addListener(clickOnIssue);
  /* chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      //TODO: your code
  }); 
  chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if(changeInfo.status =='complete'){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tab.id,{action:'SendIt'},function(response) {}); 
   }); 
};
  });}); */

// config initialize  
chrome.storage.sync.get((config) => {
  if (!config.original_language) {
    chrome.storage.sync.set({original_language: 'english'})
    // alert(config.original_language)
  }
  // alert(config.translated_language);
  if (!config.translated_language) {
    chrome.storage.sync.set({translated_language: 'chinese'})
  }

});




var pageText = ""
chrome.browserAction.onClicked.addListener((tab) => {
  
    inject(tab); 
    // chrome.tabs.captureVisibleTab(tab.id, )
    /* chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if(request.greeting == "capture"){
          chrome.tabs.captureVisibleTab(null, null, function(dataUrl){
            // console.log(dataUrl);
            sendResponse({imgurl: 'I\'m test.'});
          })
        }
      }
    ); */
    
    // alert(tab.id);
    /* chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
      if(changeInfo.status =='complete'){
      chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      chrome.tabs.sendMessage(tab.id,{action:'SendIt'},function(response) {}); 
     });
    }}); */
    var from;
    var to;
    chrome.storage.sync.get((config) => {
      if(config.original_language == 'chinese'){
        from = "zh";
      }
      else if (config.original_language == 'japanese'){
        from = "jp";
      }
      else if (config.original_language == 'english'){
        from = "en";
      }
      if(config.translated_language == 'chinese'){
        to = "zh";
      }
      else if (config.translated_language == 'japanese'){
        to = "jp";
      }
      else if (config.translated_language == 'english'){
        to = "en";
      }
    });
    var textNow = ""
    var afterTrans = ""
    chrome.extension.onRequest.addListener(
      function(request, sender, sendResponse) {
        if (request.greeting == "hello"){
          chrome.tabs.captureVisibleTab(null, {"format":"png"}, function(dataUrl){
            sendResponse({farewell:dataUrl});
          })
        }          // sendResponse({farewell: "goodbye"});
        else if (request.greeting == "text_ocr"){
          // alert(request.text_ocr);          
          var query = request.text_ocr.toString()
          /* var from = "auto"
          var to = "zh" */
          var appid = "20200327000406551"
          var key = "4h6ihdZ31eGUebgFLZ2L"
          var salt = (new Date).getTime()
          var str1 = appid + query + salt + key
          var md5_str = MD5(str1)
          $.ajax({
              url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
              type: 'get',
              dataType: 'json',
              data: {
                  appid: appid,
                  q: query,
                  from: from,
                  to: to,
                  salt: salt,
                  sign: md5_str
              },
              success: function (result) {
                
                  var res = getTranslateResult(result)
                  afterTrans = res
                  // alert(afterTrans)
                  sendResponse({farewell:afterTrans})                
              }
          })

                }
              });
    // chrome.tabs.onUpdated.removeListener();
    
});
    /* chrome.windows.getCurrent(function (win) {
      chrome.tabs.captureVisibleTab(null, {"format":"png"}, function(dataUrl){
        // imgSrc = dataUrl;
        // alert(imgSrc);
        setTimeout(() => {
          
          chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
              console.log(sender.tab ?
                          "from a content script:" + sender.tab.url :
                          "from the extension");
              if (request.greeting == "capture" ) 
                // alert(imgSrc);
                alert(dataUrl);
                imgSrc = dataUrl;
                sendResponse({imgurl: dataUrl});       
            });
        }, 100);
        
        // return imgSrc;
      });
    }); */
    // alert("ahh");
    /* chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting == "capture" ) 
          // alert(imgSrc);
          
          imgSrc = 'ahh';
          alert(imgSrc);
          sendResponse({imgurl: imgSrc});       
      }); */
      /* chrome.tabs.captureVisibleTab(null,{"format": "png"}, function(dataUrl){
        alert(dataUrl);
      })
    
    setTimeout(() => {
      chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting == "capture") 
          alert(imgSrc);
          sendResponse({imgurl: imgSrc});
      });
    }, 100);
        
  })*/

function inject(tab){
    // alert(tab.id)
    chrome.tabs.executeScript(tab.id, {file: '/js/jquery.min.js', runAt: 'document_start'})
    chrome.tabs.executeScript(tab.id, {file: '/js/html2canvas.min.js', runAt: 'document_start'})
    chrome.tabs.executeScript(tab.id, {file: '/js/jcanvas.min.js', runAt: 'document_start'})
    chrome.tabs.executeScript(tab.id, {file: '/js/jQuery.print.min.js', runAt: 'document_start'})
    chrome.tabs.executeScript(tab.id, {file: '/js/content.js', runAt: 'document_start'});

    // chrome.tabs.executeScript(tab.id, {file: '/js/content.js', runAt: 'document_start'})
    // chrome.tabs.executeScript(tab.id, {file: '/js/screenshotsPrint.js', runAt: 'document_start'})
    // chrome.tabs.executeScript(tab.id, {file: '/js/crop.js', runAt: 'document_start'})
    // chrome.tabs.executeScript(tab.id, {file: '/js/injected.js', runAt: 'document_start'})
}



var from = "";
var to = "";

function trans(text) {
  
  var query = text.toString()
    
  chrome.storage.sync.get((config) => {
    if(config.original_language == 'chinese'){
      from = "zh";
    }
    else if (config.original_language == 'japanese'){
      from = "jp";
    }
    else if (config.original_language == 'english'){
      from = "en";
    }
    if(config.translated_language == 'chinese'){
      to = "zh";
    }
    else if (config.translated_language == 'japanese'){
      to = "jp";
    }
    else if (config.translated_language == 'english'){
      to = "en";
    }
  });
  var appid = "20200327000406551"
  var key = "4h6ihdZ31eGUebgFLZ2L"
  var salt = (new Date).getTime()
  var str1 = appid + query + salt + key
  var md5_str = MD5(str1)
  $.ajax({
      url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
      type: 'get',
      dataType: 'json',
      data: {
          appid: appid,
          q: query,
          from: from,
          to: to,
          salt: salt,
          sign: md5_str
      },
      success: function (result) {
         
          var res = getTranslateResult(result)
          // alert(res)
          afterTrans = res
          
         
         
      }
  })
 
  
  
}
/* function getTranslateResult(result) {
      var resultObj = result
      var result_array = resultObj.trans_result
      if(result_array)
      {
        return result_array[0].dst
      }
      else
      {
        var errno = "error";
        return errno
      }
  
} */


var textNow = ""
var afterTrans = ""

$.ajaxSetup({
    async: false
});

chrome.contextMenus.create({
    id: 'baidu-search',
    title: 'translate',
	contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case 'baidu-search':
             chrome.tabs.query(
                     { active: true, currentWindow: true },
                    function (tabs) {
                               chrome.tabs.sendMessage(
                                     tabs[0].id,
                                   { ready: "yes" },
                                   function (response) {

                        });
                    
                })
    }
    })




    
    
function getTranslateResult(result) {
        var resultObj = result
        var result_array = resultObj.trans_result
        return result_array[0].dst
    
}



chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
      textNow = request.from;

      trans(textNow);

      sendResponse({ re: afterTrans });
     
  }
  
);

chrome.contextMenus.create({
  title: '复制并打开英语单词本：%s', // %s表示选中的文字
  contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
  onclick: function(params)
  {
      var w = document.createElement('input');
      w.value = params.selectionText;
      document.body.appendChild(w);
      w.select();
      document.execCommand("Copy");
      localStorage.setItem("abc",w.value);
      window.open(chrome.runtime.getURL('/html/English.html'));

      
  }
});

chrome.contextMenus.create({
title: '复制并打开日语单词本：%s', // %s表示选中的文字
contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
onclick: function(params)
{
  var w = document.createElement('input');
    w.value = params.selectionText;
    document.body.appendChild(w);
    w.select();
  document.execCommand("Copy");
  localStorage.setItem("abc",w.value);
      window.open(chrome.runtime.getURL('/html/Japanese.html'));
  
  
}
});
