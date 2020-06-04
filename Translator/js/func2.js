/** 
* Created by cleey.com
*/  


var datatable = null;  
var db = openDatabase("MyD","","MyDatabase",1024*100);  
function init(){  
   datatable = document.getElementById("datatable");
   var abc = localStorage.getItem("abc");  
   document.getElementById("name").value = abc;
   translate_Yandex(abc, document.getElementById("memo"));
   showAllData();  
}  
window.onload = init;
// click事件
function saveData(){  
   var name = document.getElementById("name").value;  
   var memo = document.getElementById("memo").value;  
   var time = new Date().getTime();  
   
   
   addData(name,memo,time);  
   showAllData();  
}
document.getElementById('do-saveData').onclick = saveData;
// 插入本地数据
function addData(name,message,time){  
   db.transaction(function(tx){  
       tx.executeSql("INSERT INTO MyData VALUES(?,?,?)",
           [name,message,time],
           function(tx,rs){ alert("记录成功"); },
           function(tx,error){  alert(error.source+"::"+error.message); }  
       )
   })  
}  
// 获取所有浏览数据
function showAllData(){  
   db.transaction(function(tx){  
       // tx.executeSql("DROP TABLE IF EXISTS MyData");
       tx.executeSql("CREATE TABLE IF NOT EXISTS MyData(name TEXT,message TEXT,time INTEGER)");  
       tx.executeSql("SELECT * FROM MyData",[],function(tx,rs){  
           removeAllData();  
           for (var i = 0; i < rs.rows.length; i++){  
               showData(rs.rows.item(i));  
           }  
       })  
   })  
}
// 删除表格原有内容
function removeAllData(){  
   for (var i = datatable.childNodes.length - 1; i >= 0;i--){  
       datatable.removeChild(datatable.childNodes[i]);  
   }  
   var tr = document.createElement("tr"); 
   //var th0 = document.createElement("th"); 
   var th1 = document.createElement("th");  
   var th2 = document.createElement("th");  
   var th3 = document.createElement("th"); 
  // th0.innerHTML = "ID"; 
   th1.innerHTML = "Japanese";  
   th2.innerHTML = "Chinese";  
   th3.innerHTML = "logtime";  
   //tr.appendChild(th0);
   tr.appendChild(th1);  
   tr.appendChild(th2);  
   tr.appendChild(th3);  
   datatable.appendChild(tr);  
}  
// 按照表格展现
function showData(row){  
   var tr = document.createElement("tr");  
   //var td0 = document.createElement("td");
   //td0.innerHTML = row.id;
   var td1 = document.createElement("td");  
   td1.innerHTML = row.name;  
   var td2 = document.createElement("td");  
   td2.innerHTML = row.message;  
   var td3 = document.createElement("td");  
   var t = new Date();  
   t.setTime(row.time);  
   td3.innerHTML = t.toLocaleDateString()+" "+ t.toLocaleTimeString(); 
   //tr.appendChild(td0); 
   tr.appendChild(td1);  
   tr.appendChild(td2);  
   tr.appendChild(td3);  
   datatable.appendChild(tr);  
}  



function deleteData(){  
    var name = document.getElementById("name").value;  
    // var memo = document.getElementById("memo").value;  
    // var time = new Date().getTime();  
  //  var delid = document.getElementById("did").value; 
    db.transaction(function(tx){  
        tx.executeSql("delete from MyData where name =?",[name],
                   null,null); }  
        );
     
    showAllData(); 
 }
 
 document.getElementById('do-deleteData').onclick = deleteData;
function del(){
    db.transaction(function(tx) {
        tx.executeSql("DROP TABLE MyData");
        })
    showAllData();
}
document.getElementById('do-delData').onclick = del;



function search(){  
    db.transaction(function(tx){  
        // tx.executeSql("DROP TABLE IF EXISTS MyData");
        var name = document.getElementById("name").value; 
        tx.executeSql("CREATE TABLE IF NOT EXISTS MyData(name TEXT,message TEXT,time INTEGER)");  
        tx.executeSql("SELECT * FROM MyData WHERE name = ?",[name],function(tx,rs){  
            removeAllData();  
            for (var i = 0; i < rs.rows.length; i++){  
                showData(rs.rows.item(i));  
            }  
        })  
    })  
 }
document.getElementById('do-searData').onclick = search;



function translate_Yandex(text, input){
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
            /* chrome.notifications.create(
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
            ); */
            input.value = translation;

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