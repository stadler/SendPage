SendPage
========

SendPage is a simple chromium extension to send a page to a E-Mail recipient
with your default local or web mail client.

It will actually just open a mailto URI so you need to have a (local or web) E-Mail client registered to handle mailto URIs.

Binaries
--------
Download Binaries from Chrome Web Store (also for Brave, and other Chromium based Browsers):
https://chrome.google.com/webstore/detail/higemadklcnjhjpgcbnnbpgeeippjjcp

Or the Microsoft Edge-Add-Ons Store:
https://microsoftedge.microsoft.com/addons/detail/send-page/akohgmamjjpdagmohoecbmgiejkplkfb

Sources
-------
Download Sources from GitHub:
https://github.com/stadler/SendPage

Bugs
----
Did you find a bug? Please report them here:
https://github.com/stadler/SendPage/issues

Support
--------
Do you like this Extension?
Please give this Project a Star on GitHub if you like it.

Changelog
---------

 * 3.0
   * Upgrade to manifest version 3
   * Add terms of use
   * Make it clear that also Brave and other Chromium based browsers are supported.
 * 2.3
   * Fixed #15: URI is is undefined when using button beside url
   * Provide better log output for debugging
 * 2.2
   * Fixed #14: email end text appended to URI
   * Fixed type error
 * 2.1
   * Remove unused 'tabs' permission
   * Make sure that we never have undefined appear in the message body
   * Open the options page after install
   * If sending a link, use the text of the link as subject instead of the title of the page that is containing the link.
 * 2.0
   * Replace usage of tab.update by tab.create as tabs cannot be properly updated anymore.
   * Reintroduced options page
   * Allow to define Mail text
 * 1.8 - Replaced word encoding by default encodeURIComponent and use document encoding for subject line
 * 1.7
   * Fix encoding issue in mail subject
   * Allow to send the url of links, images and videos
   * Removed options page
 * 1.6 - Show the correct URL for PDFs that are opened in the built in pdf viewer 
 * 1.5 - Added option to disable word encoding of subject for low quality mail clients that don't support it (e.g. outlook)
 * 1.4 - Made sure that the subject has the correct encoding
 * 1.3 - Make SendPage 'manifest_version' 2 compatible and proper title escaping
 * 1.2 - Support for Webmail and Options to tune close timeout
 * 1.1 - Proper escaping of ampersands in URLs
 * 1.0 - Small adaptions
 * 0.1 - Initial release
 
Troubleshoot
------------
### Nothing happens when I click "Send Page..."
For the extension to work a default mail application ("mailto:" protocol handler) must be registered on your system. If this is the case you should be able to click on [this Link](mailto:test@example.com?subject=The%20Subject&body=The%20Body) to open your Mail client.

### It does not behave correctly with Local or Web E-Mail Clients. Why?
Checkout the Options of the extension. There you can configure if your Mail client is a Web or Local E-Mail Client which may help.
Also you can define Texts that are to be shown in the E-Mail content by default.

### It still does not do what I expect. What can I do?
On the chrome extensions page (chrome://extensions/) you can enable the developer mode and open the background page.
It will provide you with logging and debugging capabilities. If you discovered an error please report it here.
