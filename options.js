// Saves options to localStorage.
function save_options() {
  var ipelement = document.getElementById("ip");
  var portelement = document.getElementById("port");
  
  localStorage["ip"] = ipelement.value;
  localStorage["port"] = portelement.value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var ip = localStorage["ip"];
  var port = localStorage["port"];
  if (!ip && !port) {
    return;
  }
  document.getElementById("ip").value = ip;
  document.getElementById("port").value = port;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);