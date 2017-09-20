linkslockr.decrypters = [
  {
    id: "puyaLink",
    key: "http://puya.si/enc",
    decrypter: linkslockr.PuyaLinkDecrypter
  },
  {
    id: "safelinkingLink",
    key: "http://safelinking.net/",
    decrypter: linkslockr.SafeLinkDecrypter
  }
];