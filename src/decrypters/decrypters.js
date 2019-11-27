linkslockr.decrypters = [
  {
    id: "puyaLink",
    keys: ["https://puya.moe/enc"],
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