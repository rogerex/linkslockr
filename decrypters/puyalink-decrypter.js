linkslockr.PuyaLinkDecrypter = PuyaLinkDecrypter;

function PuyaLinkDecrypter(url) {
  this.linkUrl = url;
  
  var DecrypterBaseURL = "https://codebeautify.org/encryptDecrypt/decrypt";
  var Key = 1234567890987654;
  
  this.decrypt = function() {	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", this.linkUrl, true);
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			manageResponse1(xhr);
		}
    }
	xhr.send();
  }
  
  function manageResponse1(xhr) {
	if (xhr.status == 200) {
	  var firstIndex = xhr.responseText.indexOf('"crypted"') + 17;
	  var lastIndex = xhr.responseText.indexOf('"', firstIndex);
	  var value = xhr.responseText.substring(firstIndex, lastIndex);
	  
	  decryptValue(value);
	} else {
	  alert("Something is wrong with the Puya server.");
	}
  }
  
  function decryptValue(valueText) {
	var data = new FormData();
	data.append('key', Key);
	data.append('alg', 'rijndael-128');
	data.append('mode', 'cbc');
	data.append('text', valueText);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", DecrypterBaseURL, true);
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			manageResponse2(xhr);
		}
    }
	
	xhr.send(data);
  }
  
  function manageResponse2(xhr) {
	if (xhr.status == 200) {
	  var decryptedURL = "https://mega.nz/" + xhr.responseText;
	  chrome.tabs.create({ url: decryptedURL });
	} else {
	  alert("Something is wrong with the Decrypter server.");
	}
  }
}