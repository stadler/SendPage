SendPage Readme
===============

SendPage is a simple chromium extension to send a page to a E-Mail recipient
with your default local or web mail client.

Binaries
--------
Download Binaries from Chrome Web Store:
https://chrome.google.com/webstore/detail/higemadklcnjhjpgcbnnbpgeeippjjcp

Sources
-------
Download Sources from GitHub:
https://github.com/stadler/SendPage

Changelog
---------
 * 1.6 - Show the correct URL for PDFs that are opened in the built in pdf viewer 
 * 1.5 - Added option to disable word encoding of subject for low quality mail clients that don't support it (e.g. outlook)
 * 1.4 - Made sure that the subject has the correct encoding
 * 1.3 - Make SendPage 'manifest_version' 2 compatible and proper title escaping
 * 1.2 - Support for Webmail & Options to tune close timeout
 * 1.1 - Proper escaping of ampersands in URLs
 * 1.0 - Small adaptions
 * 0.1 - Initial release
 
Troubleshoot
------------
### Nothing happens when I click "Send Page..."
For the extension to work a default mail application ("mailto:" protocol handler) must be registered on your system.

### The Application does not properly work with WebMail (e.g. GMail or Hotmail)
Make sure you enable the WebMail option in the Options of the Extension.

### The mail application window still doesn't open, or only at random times.
You can tune the close timeout in the Options of the Extension in order to give your local mail application a little more time to start.

Enjoy!

Donation
--------
Do you like this Extension?
Then feel free to thank me with your two cents:
[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](http://flattr.com/thing/412283/SendPage-Chromium-Extension) 
