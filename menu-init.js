function onClickHandler(info, tab) {
  if (info.menuItemId == "unlockerLink") {
    console.log(info);
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
  var title = "No Usar - Le Puya linque";
  var id = chrome.contextMenus.create({
	  "title": title, 
	  "contexts": ["link"],
      "id": "unlockerLink"}
  );
  console.log("Decrypt Item created:" + id);
});
