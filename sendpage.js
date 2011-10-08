console.log("Creating SendPage context menu entry...");
var title = "Send this page..."
var id = chrome.contextMenus.create({"type": "normal", "title": title, "contexts":["all"], "onclick": sendMail});
console.log("SendPage context menu entry created.");

function sendMail(info, tab) {
    console.log("Sending Page: " + info.pageUrl);
    var email = "";
    var subject = tab.title;
    var body_message = info.pageUrl;
    var mailto_uri = 'mailto:'+email+'?subject='+subject+'&body='+body_message;
    
    win = window.open(mailto_uri, 'emailWindow');
    if (win && win.open && !win.closed) {
        console.log("Closing opened window");
        setTimeout("win.close()",200);
        console.log("done!");
    }
    console.log("Page sent!");
}
