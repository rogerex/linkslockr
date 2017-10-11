linkslockr.DownloadManager = DownloadManager;

function DownloadManager(url) {
  this.linkUrl = url;
  
  this.download = function() {
    var url = this.linkUrl;
    
    var manager = new linkslockr.SettingsManager();
    manager.getSettings(function(object) {
        var selectedOption = manager.getOptionSelected(object);
        
        var downloader = linkslockr.downloaders[selectedOption];
        
        downloader.download(url);
    });
  }
}