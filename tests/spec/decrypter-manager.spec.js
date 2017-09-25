describe("Decrypter Manager, URL Validations", function() {
  it("It is Valid for RelinkTo", function() {
	var manager = new linkslockr.DecrypterManager("http://relink.to/f/46ca46da0f0436044f1fa649141edf");
	var result = manager.isValidURL();
	
	expect(result).toBe(true);
  });
  
  it("It is Valid for SafeLinking in http", function() {
	var manager = new linkslockr.DecrypterManager("http://safelinking.net/WzPiU9N");
	var result = manager.isValidURL();
	
	expect(result).toBe(true);
  });
  
  it("It is Valid for SafeLinking in https", function() {
	var manager = new linkslockr.DecrypterManager("https://safelinking.net/WzPiU9N");
	var result = manager.isValidURL();
	
	expect(result).toBe(true);
  });
  
  it("It is Valid for PuyaSubsEnc", function() {
	var manager = new linkslockr.DecrypterManager("http://puya.si/enc/?id=9VV");
	var result = manager.isValidURL();
	
	expect(result).toBe(true);
  });
  
  it("It is not valid for other urls", function() {
	var manager = new linkslockr.DecrypterManager("http://www.google.com");
	var result = manager.isValidURL();
	
	expect(result).toBe(false);
  });
});

describe("Decrypter Manager, Methods", function() {
  it("It can call context for decrypter", function() {
	var context;
	spyOn(linkslockr, 'ContextDecrypter').and.callFake(function(url) {
      context = new ContextDecrypter(url);
      context.decrypt = function () {};
	  
	  spyOn(context, 'decrypt');
      return context;
    });
	
	var manager = new linkslockr.DecrypterManager("http://relink.to/f/46ca46da0f0436044f1fa649141edf");
	var result = manager.decrypterDecrypt(function(){});

	expect(context.decrypt).toHaveBeenCalled();
  });
});

describe("Decrypter Manager, Decrypt methods", function() {
  beforeAll(function() {
    spyOn(linkslockr, 'DecrypterManager').and.callFake(function(url) {
      spiedObj = new DecrypterManager(url);
      spiedObj.decrypterDecrypt = function () {
		  console.log("Manager can decrypt url: " + url);
	  };
	  
	  spyOn(spiedObj, 'decrypterDecrypt');
      return spiedObj;
    });
  });
  
  it("It can decrypt for RelinkTo", function() {
	var manager = new linkslockr.DecrypterManager("http://relink.to/f/46ca46da0f0436044f1fa649141edf");
	var result = manager.decrypt();
	
	expect(result).toBe(true);
	expect(manager.decrypterDecrypt).toHaveBeenCalled();
  });
  
  it("It can decrypt for SafeLinking in http", function() {
	var manager = new linkslockr.DecrypterManager("http://safelinking.net/WzPiU9N");
	var result = manager.decrypt();
	
	expect(result).toBe(true);
	expect(manager.decrypterDecrypt).toHaveBeenCalled();
  });
  
  it("It can decrypt for SafeLinking in https", function() {
	var manager = new linkslockr.DecrypterManager("https://safelinking.net/WzPiU9N");
	var result = manager.decrypt();
	
	expect(result).toBe(true);
	expect(manager.decrypterDecrypt).toHaveBeenCalled();
  });
  
  it("It can decrypt for PuyaSubsEnc", function() {
	var manager = new linkslockr.DecrypterManager("http://puya.si/enc/?id=9VV");
	var result = manager.decrypt();
	
	expect(result).toBe(true);
	expect(manager.decrypterDecrypt).toHaveBeenCalled();
  });
  
  it("It cannot decrypt for other urls", function() {
	var manager = new linkslockr.DecrypterManager("http://google.com");
	var result = manager.decrypt();
	
	expect(result).toBe(false);
	expect(manager.decrypterDecrypt).not.toHaveBeenCalled();
  });
});

describe("Utils methods", function() {
  it("It can contains a string in array", function() {
	var utils = new linkslockr.Utils();
	var result = utils.includeInArray(["abc", "ab.html", "dfgh"], "abc?enc=1");
	
	expect(result).toBe(true);
  });
  
  it("It cannot contains a string in array", function() {
	var utils = new linkslockr.Utils();
	var result = utils.includeInArray(["abc", "ab.html", "dfgh"], "xyz?id=23");
	
	expect(result).toBe(false);
  });
});
