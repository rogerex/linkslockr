linkslockr.PuyaLinkDecrypter = PuyaLinkDecrypter;

function PuyaLinkDecrypter(url) {
  this.linkUrl = url;
  
  var Key = 1234567890987654;
  
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
	  var value = getValue(xhr.responseText);
	  
	  decryptValue(Key, value);
	} else {
	  alert("Something is wrong with the Puya server.");
	}
  }
  
  function getValue(responseText) {
	var firstIndex = responseText.indexOf('"crypted"') + 17;
	var lastIndex = responseText.indexOf('"', firstIndex);
	return responseText.substring(firstIndex, lastIndex);
  }
  
  function decryptValue(keyText, valueText) {
	var decrypter = new linkslockr.RijndaelDecrypter();
	decrypter.decrypt(keyText, valueText);
  }
}