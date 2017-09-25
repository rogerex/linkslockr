function onClickHandler(info, tab) {
  if (info.menuItemId == "unlockerLink") {
	var manager = new linkslockr.DecrypterManager(info.linkUrl);
	
	if (manager.isValidURL()) {
	  manager.decrypt();
	} else {
	  console.log("The URL: '" + info.linkUrl + "' is not valid.");
	  alert("This is not a valid Link.");
	}
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
  var title = "No Usar - Le Puya linque";
  var id = chrome.contextMenus.create({
	"title": title, 
	"contexts": ["link"],
    "id": "unlockerLink"
  });
  console.log("Decrypt Item created:" + id);
});
