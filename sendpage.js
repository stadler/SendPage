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

  var bodyPrefix = safeGetOptionWithNewline("", options.bodyPrefix, "\n");
  var bodyPostfix = safeGetOptionWithNewline("\n", options.bodyPostfix, "");
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

function safeGetOptionWithNewline(prefix, option, postfix) {
  return (variableExists(option) && option.length != 0) ? prefix + option + postfix : "";
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
  console.log("Determine Subject and URI. info: " + JSON.stringify(info) + ", tab: " + JSON.stringify(tab));
  if (variableExists(info.linkUrl)) {
    // Use the link url if the user clicked a link
    result.subject = variableExists(info.selectionText) ? info.selectionText : tab.title;
    result.url = info.linkUrl;
  } else if (variableExists(info.srcUrl)) {
    // For Images or other stuff containing src attributes
    result.subject = tab.title;
    result.url = info.srcUrl;
  } else if (variableExists(info.pageUrl) && info.pageUrl.startsWith("chrome-extension://"))  {
    // For PDFs and other extensions there is no pageUrl so the srcUrl is better suited
    result.subject = tab.title;
    result.url = info.srcUrl;
  } else if (variableExists(info.pageUrl)) {
    // Use page url if possible
    result.subject = tab.title;
    result.url = info.pageUrl;
  } else {
    // Normally send the url of the page
    result.subject = tab.title;
    result.url = tab.url;
  }
  return result;
}

function variableExists(myVar) {
  return typeof myVar !== "undefined";
}
