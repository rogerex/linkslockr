linkslockr.DecrypterManager = DecrypterManager;

function DecrypterManager(url) {
  this.linkUrl = url;
  
  this.isValidURL = function() {
	var isValid = false;
	var i = 0;
	
	while(!isValid && i < linkslockr.decrypters.length) {
	  var decrypterInfo = linkslockr.decrypters[i];
	  
      if (this.linkUrl.includes(decrypterInfo.key)) {
		isValid = true;
      }
	  
	  i++;
	}
	
	return isValid;
  }
  
  this.decrypt = function() {
	var decrypterNotFound = true;
	var i = 0;
	
	while(decrypterNotFound && i < linkslockr.decrypters.length) {
	  var decrypterInfo = linkslockr.decrypters[i];
	  
      if (this.linkUrl.includes(decrypterInfo.key)) {
		decrypterNotFound = false;
		contextDecrypt(this.linkUrl, decrypterInfo.decrypter);
      }
	  
	  i++;
	}
  }
  
  function contextDecrypt(url, decrypterConstructor) {
	var decrypter = new decrypterConstructor(url);
	var context = new ContextDecrypter(decrypter);
	context.decrypt();
  }
}