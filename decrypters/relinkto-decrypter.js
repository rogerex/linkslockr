linkslockr.ReLinkToDecrypter = ReLinkToDecrypter;

function ReLinkToDecrypter(url) {
  this.linkUrl = url;
  
  var DecrypterBaseURL = "https://codebeautify.org/encryptDecrypt/decrypt";
  var Key = 0;
  
  this.decrypt = function() {	
	sendGetRequest(this.linkUrl);
  }
  
  function sendGetRequest(linkUrl) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", linkUrl, true);
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			manageResponse1(xhr);
		}
    }
	xhr.send();
  }
  
  function manageResponse1(xhr) {
	if (xhr.status == 200) {
	  var firstIndex = xhr.responseText.indexOf('"crypted"') + 17 + 15;
	  var lastIndex = xhr.responseText.indexOf('"', firstIndex);
	  var value = xhr.responseText.substring(firstIndex, lastIndex);
	  
	  var firstIndex1 = xhr.responseText.indexOf('"jk"') + 12 + 25;
	  var lastIndex1 = xhr.responseText.indexOf("'", firstIndex1);
	  var key = xhr.responseText.substring(firstIndex1, lastIndex1);
	  
	  key = f(key);
	  Key = getKey(key);
	  
	  decryptValue(value);
	} else if (xhr.status == 302) {
      var newUrl = xhr.getResponseHeader("Location");
	  sendGetRequest(newUrl);
    } else {
	  alert("Something is wrong with the ReLlinkTo server.");
	}
  }
  
  function f(org){
    var dec = ''; 
    var i = 0; 
  
    for(i=32;i>=0;i--){ 
      dec+=org.substring(i,i+1); 
    } 
    return dec; 
  }
  
  function getKey(data) {
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