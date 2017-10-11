linkslockr.ChromeTabDownloader = ChromeTabDownloader;

function ChromeTabDownloader(url) {
  this.linkUrl = url;
  
  this.download = function() {
      chrome.tabs.create({ url: this.linkUrl });
  }
}