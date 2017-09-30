linkslockr.KeyValueFinder = KeyValueFinder;

function KeyValueFinder(responseText) {
  this.responseText = responseText;

  this.getValue = function (findFrom) {
	var firstIndex = this.responseText.indexOf('"crypted"') + findFrom;
	var lastIndex = this.responseText.indexOf('"', firstIndex);
	return this.responseText.substring(firstIndex, lastIndex);
  }

  this.getKey = function (findFrom) {
	var firstIndex = this.responseText.indexOf('"jk"') + findFrom;
	var lastIndex = this.responseText.indexOf("'", firstIndex);
	return this.responseText.substring(firstIndex, lastIndex);
  }
}