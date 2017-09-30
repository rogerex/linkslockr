linkslockr.ReLinkToDecrypter = ReLinkToDecrypter;

function ReLinkToDecrypter(url) {
  this.linkUrl = url;
  
  this.decrypt = function() {	
	sendGetRequest(this.linkUrl);
  }
  
  function sendGetRequest(linkUrl) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", linkUrl, true);
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			manageResponse(xhr);
		}
    }
	xhr.send();
  }
  
  function manageResponse(xhr) {
	if (xhr.status == 200) {
	  var keyValue = getKeyValue(xhr.responseText);
	  
	  decryptValue(keyValue);
	} else if (xhr.status == 302) {
      var newUrl = xhr.getResponseHeader("Location");
	  sendGetRequest(newUrl);
    } else {
	  alert("Something is wrong with the RelinkTo server.");
	}
  }
  
  function getKeyValue(responseText) {
	var finder = new linkslockr.KeyValueFinder(responseText);
	return {
		key: getKey(finder.getKey(12 + 25)),
		value: finder.getValue(17 + 15)
	};
  }
  
  function getKey(keyText) {
	var modifiedKey = f(keyText);
	return decryptKey(modifiedKey);
  }

  function f(org){
    var dec = ''; 
    var i = 0; 
  
    for(i=32;i>=0;i--){ 
      dec+=org.substring(i,i+1); 
    } 
    return dec; 
  }

  function decryptKey(data) {
	var result8 = hex2text(data)
    return unescape(encodeURIComponent(result8));
  }

  function hex2text(hex) {
	hex = hex.toUpperCase();
	if (hex.length % 2)
		return "";
	var digits = "0123456789ABCDEF";
	var text = "";
	for (i = 0; i < hex.length; i += 2) {
		hc = digits.indexOf(hex[i])
		lc = digits.indexOf(hex[i+1])
		if (hc < 0 || lc < 0)
			return "";
		cc = (hc << 4) + lc;
		text += String.fromCharCode(cc);
	}
	return text;
  }
  
  function decryptValue(keyValue) {
	var decrypter = new linkslockr.RijndaelDecrypter();
	decrypter.decrypt(keyValue.key, keyValue.value);
  }
}