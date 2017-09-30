linkslockr.Base16Decrypter = Base16Decrypter;

function Base16Decrypter(url) {
  this.decrypt = function (code, preCallback) {
    var modifiedKey = code;

    if (preCallback)
      modifiedKey = preCallback(code);

    return decryptKey(modifiedKey);
  }

  function decryptKey(data) {
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
}