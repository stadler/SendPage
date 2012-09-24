    // Saves options to localStorage.
    function save_options() {
      console.log("Saving options...");
      localStorage["webmail"] = document.getElementById("input_webmail").checked;
      localStorage["ms_until_close"] = document.getElementById("ms_until_close").value;

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
      document.getElementById("input_webmail").checked = false;
      input_webmail_changed();
      document.getElementById(	"ms_until_close").value = 1000;
      ms_until_close_changed();
    }

    // Restores select box state to saved value from localStorage.
    function restore_options() {
      restore_webmail();
      restore_ms_until_close();
    }
    
    function restore_webmail() {
      console.log("restoring webmail option");
      var webmail = localStorage["webmail"];
      if (typeof(webmail) == 'undefined' || webmail == 'false') {
        webmail = false;
      } else {
        webmail = true;
      }
      var checkbox = document.getElementById("input_webmail");
      checkbox.checked = webmail;
      input_webmail_changed();
    }
    
    function restore_ms_until_close() {
      console.log("restoring ms_until_close");
      var ms_until_close = localStorage["ms_until_close"];
      if (!ms_until_close) {
        ms_until_close = 1000;
      }
      var range = document.getElementById("ms_until_close");
      range.value = ms_until_close;
      ms_until_close_changed();
    }
    
    // Change Handlers
    function input_webmail_changed() {
      console.log("input_webmail changed");
      if (document.getElementById("input_webmail").checked) {
        document.getElementById("div_close_timeout").style.visibility = 'hidden';
      } else {
        document.getElementById("div_close_timeout").style.visibility = 'visible';
      }
    }
    
    function ms_until_close_changed() {
      console.log("ms_until_close changed");
      document.getElementById("output_ms_until_close").innerHTML = (document.getElementById("ms_until_close").value / 1000) + "s";
    }

  function dom_content_loaded() {
    console.log("Setting Event Listeners...");
    restore_options();
    document.querySelector("#input_webmail").onchange = input_webmail_changed;
    document.querySelector("#ms_until_close").onchange = ms_until_close_changed;
    document.querySelector("#save_button").onclick = save_options;
    document.querySelector("#reset_button").onclick = reset_options;
    console.log("Event Listeners set.");
  }

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', dom_content_loaded);