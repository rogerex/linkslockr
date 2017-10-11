window.onload = function() {
  document.getElementById('option0').onclick = saveOption;
  document.getElementById('option1').onclick = saveOption;
  document.getElementById('option2').onclick = saveOption;

  var manager = new linkslockr.SettingsManager();
  manager.getSettings(function(object) {
    var selectedOption = manager.getOptionSelected(object);

    document.getElementById("option" + selectedOption).checked = true;
    
    manager.saveOptionInSettings(selectedOption);
  });
}

function saveOption() {  
  var value = getOptionSelected();

  var manager = new linkslockr.SettingsManager();
  manager.saveOptionInSettings(value);
}

function getOptionSelected() {
  var options = document.getElementsByName("option");
  
  for(var i = 0; i < options.length; i++){
    if(options[i].checked){
      return options[i].value;
    }
  }
}
