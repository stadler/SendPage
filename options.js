  // Saves options to localStorage.
  function save_options() {
    console.log("Saving options...");
    localStorage["wordEncoding"] = document.getElementById("input_encoding").checked;
    options_saved();
  }

  function options_saved() {
    document.getElementById("status").innerHTML = "Options Saved.";
    setTimeout(options_saved_hide, 750);
  }

  function options_saved_hide() {
      document.getElementById("status").innerHTML = "";
    }

  function reset_options() {
    document.getElementById("input_encoding").checked = false;
  }

  // Restores select box state to saved value from localStorage.
  function restore_options() {
    restore_encoding();
  }

  function restore_encoding() {
    console.log("restoring encoding option");
    var wordEncoding = localStorage["wordEncoding"];
    if (typeof(wordEncoding) == 'undefined' || wordEncoding == 'false') {
      wordEncoding = false;
    } else {
      wordEncoding = true;
    }
    var checkbox = document.getElementById("input_encoding");
    checkbox.checked = wordEncoding;
    input_encoding_changed();
  }
    
  function dom_content_loaded() {
    console.log("Setting Event Listeners...");
    restore_options();
    document.querySelector("#save_button").onclick = save_options;
    document.querySelector("#reset_button").onclick = reset_options;
    console.log("Event Listeners set.");
  }

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', dom_content_loaded);