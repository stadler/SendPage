console.log("Creating SendPage context menu entry...");
var title = "Send this page..."
var id = chrome.contextMenus.create({"type": "normal", "title": title, "contexts":["all"], "onclick": sendMail});
console.log("SendPage context menu entry created.");

function sendMail(info, tab) {
  console.log("Sending Page: " + info.pageUrl);
  var email = "";
  var subject = tab.title;
  var body_message = escape(info.pageUrl);
  var mailto_uri = 'mailto:'+email+'?subject='+subject+'&body='+body_message;
  console.log("The MailTo URI=\n'" + mailto_uri +"'")
  
  win = window.open(mailto_uri, '_blank');
  
  if (!getWebmailOption() && win && win.open && !win.closed) {
    console.log("Closing opened window");
    setTimeout("win.close()",getCloseTimeoutOption());
    console.log("done!");
  }
  console.log("Page sent!");
}

function getWebmailOption() {
  var isWebmail = localStorage["webmail"];
  if (typeof(isWebmail) == 'undefined' || isWebmail == 'false') {
    console.log("Webmail disabled.");
    return false;
  } else {
    console.log("Webmail enabled.");
    return true;
  }  
}

function getCloseTimeoutOption() {
  var ms_until_close = localStorage["ms_until_close"];
  if (typeof(ms_until_close) == 'undefined' || !ms_until_close) {
    ms_until_close = 1000;
  }
  console.log("Closing timeout: " + ms_until_close);
  return ms_until_close;
}
