linkslockr.DecrypterManager = DecrypterManager;
linkslockr.Utils = Utils;

function DecrypterManager(url) {
  this.linkUrl = url;
  this.utils = new linkslockr.Utils();
  
  this.isValidURL = function() {
	var isValid = false;
	var i = 0;
	
	while(!isValid && i < linkslockr.decrypters.length) {
	  var decrypterInfo = linkslockr.decrypters[i];
	  
      isValid = this.utils.includeInArray(decrypterInfo.keys, this.linkUrl);
	  
	  i++;
	}
	
	return isValid;
  }
  
  this.decrypt = function() {
	var decrypterNotFound = true;
	var i = 0;
	
	while(decrypterNotFound && i < linkslockr.decrypters.length) {
	  var decrypterInfo = linkslockr.decrypters[i];
	  
      if (this.utils.includeInArray(decrypterInfo.keys, this.linkUrl)) {
		decrypterNotFound = false;
		this.decrypterDecrypt(decrypterInfo.decrypter);
      }
	  
	  i++;
	}
	
	return !decrypterNotFound;
  }
  
  this.decrypterDecrypt = function (decrypterClass) {
	var decrypter = new decrypterClass(this.linkUrl);
	var context = new linkslockr.ContextDecrypter(decrypter);
	context.decrypt();
  }
}

function Utils() {
  this.includeInArray = function (array, include) {
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