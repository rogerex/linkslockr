describe("Downloaders", function() {
  it("ChromeTabDownloader can download", function() {
    spyOn(chrome.tabs, 'create');

    var downloader = new linkslockr.ChromeTabDownloader();
    downloader.download('URL');

    expect(chrome.tabs.create).toHaveBeenCalled();
  });
});