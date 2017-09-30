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
    var decrypter = new linkslockr.Base16Decrypter();
    
    return {
        key: decrypter.decrypt(finder.getKey(34)),
        value: finder.getValue(17)
    };
  }
  
  function decryptValue(keyValue) {
    var decrypter = new linkslockr.RijndaelDecrypter();
    decrypter.decrypt(keyValue.key, keyValue.value);
  }
}