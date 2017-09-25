linkslockr.DecrypterManager = DecrypterManager;

function DecrypterManager(url) {
  this.linkUrl = url;
  
  this.isValidURL = function() {
	var isValid = false;
	var i = 0;
	
	while(!isValid && i < linkslockr.decrypters.length) {
	  var decrypterInfo = linkslockr.decrypters[i];
	  
      isValid = includeInArray(decrypterInfo.keys, this.linkUrl);
	  
	  i++;
	}
	
	return isValid;
  }
  
  this.decrypt = function() {
	var decrypterNotFound = true;
	var i = 0;
	
	while(decrypterNotFound && i < linkslockr.decrypters.length) {
	  var decrypterInfo = linkslockr.decrypters[i];
	  
      if (includeInArray(decrypterInfo.keys, this.linkUrl)) {
		decrypterNotFound = false;
		contextDecrypt(this.linkUrl, decrypterInfo.decrypter);
      }
	  
	  i++;
	}
	
	return !decrypterNotFound;
  }
  
  function contextDecrypt(url, decrypterConstructor) {
	var decrypter = new decrypterConstructor(url);
	var context = new ContextDecrypter(decrypter);
	context.decrypt();
  }
  
  function includeInArray(array, include) {
	var i = 0;
	var included = false;
	
	while (i < array.length && !included) {
		if (include.includes(array[i])) {
			included = true;
		}
		i++;
	}
	
	return included;
  }
}