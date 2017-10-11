linkslockr.DownloaderManager = DownloaderManager;

function DownloaderManager(url) {
  this.linkUrl = url;
  
  this.download = function() {
    var url = this.linkUrl;
    
    var manager = new linkslockr.SettingsManager();
    manager.getSettings(function(object) {
        var selectedOption = manager.getOptionSelected(object);
        
        var downloader;

        switch(selectedOption) {
            case 0:
            default:
              downloader = new linkslockr.ChromeTabDownloader(url);
              break;   
        }
        
        downloader.download();
    });
  }
}