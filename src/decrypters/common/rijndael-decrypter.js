linkslockr.RijndaelDecrypter = RijndaelDecrypter;

function RijndaelDecrypter() {
  var DecrypterBaseURL = "https://codebeautify.org/encryptDecrypt/decrypt";
  
  this.decrypt = function (keyText, valueText) {
    var data = new FormData();
    
    data.append('key', keyText);
    data.append('alg', 'rijndael-128');
    data.append('mode', 'cbc');
    data.append('text', valueText);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", DecrypterBaseURL, true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            manageResponse(xhr);
        }
    }
    
    xhr.send(data);
  }
  
  function manageResponse(xhr) {
    if (xhr.status == 200) {
      var decryptedURL = "https://mega.nz/" + xhr.responseText;
      chrome.tabs.create({ url: decryptedURL });
    } else {
      alert("Something is wrong with the Decrypter server.");
    }
  }
}