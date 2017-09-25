linkslockr.decrypters = [
  {
    id: "puyaLink",
    keys: ["http://puya.si/enc"],
    decrypter: linkslockr.PuyaLinkDecrypter
  },
  {
    id: "reLinkTo",
    keys: ["http://relink.to"],
    decrypter: linkslockr.ReLinkToDecrypter
  },
  {
    id: "safelinkingLink",
    keys: ["http://safelinking.net/", "https://safelinking.net/"],
    decrypter: linkslockr.SafeLinkDecrypter
  }
];