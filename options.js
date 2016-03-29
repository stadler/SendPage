function save_options() {
  chrome.storage.sync.set(
    {
      mailClientType: document.getElementById('mailClientType').value,
      bodyPrefix: document.getElementById('bodyPrefix').value,
      bodyPostfix: document.getElementById('bodyPostfix').value,
    },
    updateStatus);
}

function updateStatus() {
  var status = document.getElementById('status');
  var popupTimeInMs = 750;
  status.textContent = 'Options saved.';
  setTimeout(function() {
    status.textContent = '';
  }, popupTimeInMs);
}

function restore_options() {
  chrome.storage.sync.get(
    {
      // defaults
      mailClientType: 'web',
      bodyPrefix: '',
      bodyPostfix: ''
    },
    function(items) {
      document.getElementById('mailClientType').value = items.mailClientType;
      document.getElementById('bodyPrefix').value = items.bodyPrefix;
      document.getElementById('bodyPostfix').value = items.bodyPostfix;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);