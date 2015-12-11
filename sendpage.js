/**
 * Registers a context menu entry that upon click, opens a mailto uri containing page title and url of the given context.
 */

console.log("Creating SendPage context menu entry...");
var id = chrome.contextMenus.create({"type": "normal", "title": "Send this page...", "contexts":["all"], "onclick": sendMail});
console.log("SendPage context menu entry created.");

function sendMail(info, tab) {
  var subject = mimeWordEncode(tab.title);
  console.log("Sending Mail with Subject: " + subject);

  var body_message = determineUrlOfClickedElement(info);
  var body = encodeBody(body_message)
  console.log("Sending Mail with Body: " + body);

  var mailto_uri = "mailto:?subject=" + subject + "&body=" + body;
  console.log("The MailTo URI=\n'" + mailto_uri +"'")

  chrome.tabs.update(null, {url: mailto_uri});
  console.log("Mail created!");
}

function determineUrlOfClickedElement(info) {
  if (typeof info.linkUrl != "undefined") {
    // Use the link url if the user clicked a link
    return info.linkUrl;
  } else if (typeof info.srcUrl != "undefined") {
    // For Images or other stuff containing src attributes
   return info.srcUrl;
  } else if (info.pageUrl.startsWith("chrome-extension://"))  {
    // For PDFs and other extensions there is no pageUrl so the srcUrl is better suited
    return info.srcUrl;
  } else {
    // Normally send the url of the page
   return info.pageUrl;
  }
}

function encodeBody(string) {
  return encodeURIComponent(string)
}

function mimeWordEncode(string) {
  // Tab title should always be utf-8
  var docCharSet = 'utf-8';
  // =? charset ? Q (like quoted-printable) or B (base64) ? encoded string ?=
  return "=?"+ docCharSet +"?B?" + utf8_to_base64(string) + "?=";
}

function utf8_to_base64(str) {
  return window.btoa(decodeURIComponent(encodeURIComponent(str)));
}
