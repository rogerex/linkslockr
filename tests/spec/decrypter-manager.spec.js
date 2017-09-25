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