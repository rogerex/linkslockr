linkslockr.decrypters = [
  {
    id: "puyaLink",
    key: "http://puya.si/enc",
    decrypter: function (url) {}
  },
  {
    id: "safelinkingLink",
    key: "http://safelinking.net/",
    decrypter: linkslockr.SafeLinkDecrypter
  }
];