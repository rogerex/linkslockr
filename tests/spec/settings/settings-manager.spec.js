describe("Local Storage Settings", function() {
  it("Can get settings", function() {
    spyOn(chrome.storage.local, 'get');

    var manager = new linkslockr.SettingsManager();
    var result = manager.getSettings(function(storage){
        
    });

    expect(chrome.storage.local.get).toHaveBeenCalled();
  });
  
  it("Can save option in settings", function() {
    spyOn(chrome.storage.local, 'set');

    var manager = new linkslockr.SettingsManager();
    var result = manager.saveOptionInSettings(1);

    expect(chrome.storage.local.set).toHaveBeenCalled();
  });
  
  it("Can get default option in settings", function() {
    var manager = new linkslockr.SettingsManager();
    var result = manager.getOptionSelected({ settings: { option: 2 } });

    expect(result == 2).toBe(true);
  });
  
  it("Can get default option in null settings", function() {
    var manager = new linkslockr.SettingsManager();
    var result = manager.getOptionSelected({});

    expect(result == 0).toBe(true);
  });
});