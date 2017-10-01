window.onload = function() {
  document.getElementById('option0').onclick = saveOption;
  document.getElementById('option1').onclick = saveOption;
  document.getElementById('option2').onclick = saveOption;

  getSettings(function(object) {
    var selectedOption = 0;
    
    if (object.settings) {
      if (object.settings.option)
        selectedOption = object.settings.option;
    }

    document.getElementById("option" + selectedOption).checked = true;
    saveOptionInSettings(selectedOption);
  });
}

function saveOption() {
  var options = document.getElementsByName("option");
  
  for(var i = 0; i < options.length; i++){
    if(options[i].checked){
      var value = options[i].value;
      saveOptionInSettings(value);
    }
  }
}

function saveOptionInSettings(option) {
  chrome.storage.local.set({settings : { option: option } }, function() {
    console.log('Set option in settings', option);
  });
}

function getSettings(callback) {
  return chrome.storage.local.get("settings", callback);
}
