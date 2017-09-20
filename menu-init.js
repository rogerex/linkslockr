function onClickHandler(info, tab) {
  if (info.menuItemId == "unlockerLink") {
    console.log(info);
	if (info.linkUrl.includes("http://puya.si/enc")) {
		chrome.tabs.create({ url: info.linkUrl });
	} else if (info.linkUrl.includes("http://safelinking.net/")) {
		var decrypter = new SafeLinkDecrypter(info.linkUrl);
		decrypter.decrypt();
    } else {
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
