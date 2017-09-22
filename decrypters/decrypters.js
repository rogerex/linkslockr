linkslockr.decrypters = [
  {
    id: "puyaLink",
    keys: ["http://puya.si/enc"],
    decrypter: linkslockr.PuyaLinkDecrypter
  },
  {
    id: "safelinkingLink",
    keys: ["http://safelinking.net/", "https://safelinking.net/"],
    decrypter: linkslockr.SafeLinkDecrypter
  }
];