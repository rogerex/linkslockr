describe("Rijndael Decrypter", function() {
  beforeEach(function() {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("It is Valid for decryption", function() {
    chrome = {
      tabs: {
        create: function (obj) {}
      }
    };

    spyOn(chrome.tabs, 'create');

    jasmine.Ajax.stubRequest('https://codebeautify.org/encryptDecrypt/decrypt').andReturn({
      "responseText": 'immediate response'
    });

    var decrypter = new linkslockr.RijndaelDecrypter();
    var result = decrypter.decrypt('123', 'p7EJlLa5ZcPC+UAtd+GxUr6Oqt3NcrZcVy3BfN75eZE=');

    expect(chrome.tabs.create).toHaveBeenCalled();
  });
});