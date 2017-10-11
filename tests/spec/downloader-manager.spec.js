describe("Downloader Suite", function() {
  it("Download method in manager is called.", function() {
    var downloader = {
        download: function() {}
    }
    spyOn(downloader, 'download');
    
    linkslockr.downloaders[0] = downloader;
    
    var manager = new linkslockr.DownloaderManager('URL');
    manager.download();
    
    expect(downloader.download).toHaveBeenCalled();
  });
});