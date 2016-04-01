/**
 * Registers a context menu entry that upon click, opens a mailto uri containing page title and url of the given context.
 */

firstTimeOptionsPopup();
console.log("Creating SendPage context menu entry...");
var id = chrome.contextMenus.create({"type": "normal", "title": "Send this page...", "contexts":["all"], "onclick": fetchOptions});
console.log("SendPage context menu entry created.");


function firstTimeOptionsPopup() {
  if (localStorage.getItem('wasAlreadyStarted')) {
    return;
  }
  localStorage.setItem('wasAlreadyStarted', true);
  chrome.runtime.openOptionsPage(optionsPageOpened);
}

function optionsPageOpened() {
  console.log("Options page opened...")
}

function fetchOptions(info, tab) {
  chrome.storage.sync.get(['bodyPrefix', 'bodyPostfix', 'mailClientType'], function(options) {
    sendMail(info, tab, options);
  });
}

function sendMail(info, tab, options) {
  var subjectAndUrl = determineSubjectAndUrl(info, tab);

  var subject = encodeURIComponent(subjectAndUrl.subject);
  console.log("Sending Mail with Subject: " + subject);

  var bodyPrefix = safeGetOptionWithNewline(options.bodyPrefix);
  var bodyPostfix = safeGetOptionWithNewline(options.bodyPostfix);
  var body = encodeURIComponent(bodyPrefix + subjectAndUrl.url + bodyPostfix);
  console.log("Sending Mail with Body: " + body);

  var mailToUrl = "mailto:?subject=" + subject + "&body=" + body;
  console.log("The MailTo URL=\n'" + mailToUrl +"'");

  if (options.mailClientType === 'local') {
    // Only create new tab to close it after mailto handler opened
    chrome.tabs.create({url: mailToUrl, active: false}, tabCreatedAndCloseCallback);
  } else {
    // Keep tab opened
    chrome.tabs.create({url: mailToUrl, active: true}, tabCreatedCallback);
  }
}

function safeGetOptionWithNewline(option) {
  return (typeof option !== 'undefined' && option.length != 0) ? option + "\n" : "";
}

function tabCreatedCallback(tab) {
  console.log("New WebMail Tab created...");
}

function tabCreatedAndCloseCallback(tab) {
  var timeoutInMs = 500;
  console.log("New Tab created and will be closed again in " + timeoutInMs + "ms ...");
  setTimeout(
    function() {
      console.log("Closing new tab again...")
      chrome.tabs.remove(tab.id);
    },
    timeoutInMs);
}

function determineSubjectAndUrl(info, tab) {
  var result = {subject:'', url:''};
  if (typeof info.linkUrl != "undefined") {
    // Use the link url if the user clicked a link
    result.subject = info.selectionText;
    result.url = info.linkUrl;
  } else if (typeof info.srcUrl != "undefined") {
    // For Images or other stuff containing src attributes
    result.subject = tab.title;
    result.url = info.srcUrl;
  } else if (info.pageUrl.startsWith("chrome-extension://"))  {
    // For PDFs and other extensions there is no pageUrl so the srcUrl is better suited
    result.subject = tab.title;
    result.url = info.srcUrl;
  } else {
    // Normally send the url of the page
    result.subject = tab.title;
    result.url = info.pageUrl;
  }
  return result;
}
