linkslockr.SettingsManager = SettingsManager;

function SettingsManager(url) {
  this.saveOptionInSettings = function (option) {
    chrome.storage.local.set({settings : { option: option } }, function() {
      console.log('Set option in settings', option);
    });
  }

  this.getSettings = function (callback) {
    return chrome.storage.local.get("settings", callback);
  }
  
  this.getOptionSelected = function (object) {
    var selectedOption = 0;

    if (object.settings) {
      if (object.settings.option)
        selectedOption = object.settings.option;
    }

    return selectedOption;
  }
}