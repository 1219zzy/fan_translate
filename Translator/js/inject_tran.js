
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if(request.ready=="yes")
        getUserSelection()
    });

window.onkeydown = function () {
    if (90 == event.keyCode && event.ctrlKey ) {
        getUserSelection();
    }
} 

function getUserSelection() {
   
         selection = window.getSelection().toString();
         // alert(selection);
        chrome.runtime.sendMessage({ from: selection }, function (response) {
            if (response.re) {
                translation = response.re;
                insertHtmlAfterSelection(window.getSelection(), translation);
            }
        });
    
}



function insertHtmlAfterSelection(selectionObject, translation) {
  let range;
  let expandedSelRange;
  let node;
    
  if (selectionObject.getRangeAt && selectionObject.rangeCount) {
    range = selectionObject.getRangeAt(0);
    expandedSelRange = range.cloneRange();
    range.collapse(false);
    const el = document.createElement("div");
    el.innerHTML = ` [${translation}] `;
    let frag = document.createDocumentFragment();
    let node;
    let lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);
    selectionObject.empty();
  }
}
