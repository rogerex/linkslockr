function onClickHandler(info, tab) {
  if (info.menuItemId == "unlockerLink") {
    console.log(info);
	if (info.linkUrl.includes("http://puya.si/enc")) {
		chrome.tabs.create({ url: info.linkUrl });
	} else if (info.linkUrl.includes("http://safelinking.net/")) {
		var hash = info.linkUrl.replace("http://safelinking.net/", "");
		var params = "hash=" + hash;
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://safelinking.net/v1/protected", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
			var response = JSON.parse(xhr.responseText);
			var decryptedURL = response.links[0].url;
			chrome.tabs.create({ url: decryptedURL });
		  }
		}
		xhr.send(JSON.stringify({ hash: hash }));
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
