linkslockr.ReLinkToDecrypter = ReLinkToDecrypter;

function ReLinkToDecrypter(url) {
  this.linkUrl = url;
  
  this.decrypt = function() {    
    sendGetRequest(this.linkUrl);
  }
  
  function sendGetRequest(linkUrl) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", linkUrl, true);
    
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
    } else if (xhr.status == 302) {
      var newUrl = xhr.getResponseHeader("Location");
      sendGetRequest(newUrl);
    } else {
      alert("Something is wrong with the RelinkTo server.");
    }
  }
  
  function getKeyValue(responseText) {
    var finder = new linkslockr.KeyValueFinder(responseText);
    var decrypter = new linkslockr.Base16Decrypter();

    return {
        key: decrypter.decrypt(finder.getKey(12 + 25), f),
        value: finder.getValue(17 + 15)
    };
  }

  function f(org){
    var dec = ''; 
    var i = 0; 
  
    for(i=32;i>=0;i--){ 
      dec+=org.substring(i,i+1); 
    } 
    return dec; 
  }
  
  function decryptValue(keyValue) {
    var decrypter = new linkslockr.RijndaelDecrypter();
    decrypter.decrypt(keyValue.key, keyValue.value);
  }
}