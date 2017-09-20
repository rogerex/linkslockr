function SafeLinkDecrypter(url) {
  this.linkUrl = url;
  this.SafeLinkRequestURL = "http://safelinking.net/v1/protected";
  this.SafeLinkBaseURL = "http://safelinking.net/";
  
  this.decrypt = function() {
	var hash = this.linkUrl.replace(this.SafeLinkBaseURL, "");
	var params = "hash=" + hash;
		
	var xhr = new XMLHttpRequest();
	xhr.open("POST", this.SafeLinkRequestURL, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			manageResponse(xhr);
		}
    }
	xhr.send(JSON.stringify({ hash: hash }));
  }
  
  function manageResponse(xhr) {
	if (xhr.status == 200) {
	  var response = JSON.parse(xhr.responseText);
	
	  for (var i = 0; i < response.links.length; i++) {
        var linkInfo = response.links[i];
	    var decryptedURL = linkInfo.url;
	    chrome.tabs.create({ url: decryptedURL });
      }
	} else {
	  alert("Something is wrong with the SafeLink server.");
	}
  }
}