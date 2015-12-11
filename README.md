SendPage Readme
===============

SendPage is a simple chromium extension to send a page to a E-Mail recipient
with your default local or web mail client.

It will actually just open a mailto URI so you need to have a E-Mail client registered to handle mailto URIs.

Binaries
--------
Download Binaries from Chrome Web Store:
https://chrome.google.com/webstore/detail/higemadklcnjhjpgcbnnbpgeeippjjcp

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
For the extension to work a default mail application ("mailto:" protocol handler) must be registered on your system.
