linkslockr.ChromeTabDownloader = ChromeTabDownloader;

function ChromeTabDownloader() {
  this.download = function(linkUrl) {
      chrome.tabs.create({ url: linkUrl });
  }
}