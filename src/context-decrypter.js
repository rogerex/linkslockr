linkslockr.ContextDecrypter = ContextDecrypter;

function ContextDecrypter(decrypter) {
  this.decrypter = decrypter;
  
  this.decrypt = function() {
	this.decrypter.decrypt();
  }
}