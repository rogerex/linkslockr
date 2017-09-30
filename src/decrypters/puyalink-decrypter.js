linkslockr.PuyaLinkDecrypter = PuyaLinkDecrypter;

function PuyaLinkDecrypter(url) {
  this.linkUrl = url;
  
  this.decrypt = function() {	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", this.linkUrl, true);
	
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
	} else {
	  alert("Something is wrong with the Puya server.");
	}
  }
  
  function getKeyValue(responseText) {
	var finder = new linkslockr.KeyValueFinder(responseText);
	return {
		key: decryptKey(finder.getKey(34)),
		value: finder.getValue(17)
	};
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