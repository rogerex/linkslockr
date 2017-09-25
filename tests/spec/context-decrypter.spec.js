describe("Context Decrypter Suite", function() {
  it("Decrypt method in context is called.", function() {
	var decrypter = {
		decrypt: function() {}
	}
	spyOn(decrypter, 'decrypt');
	
    var context = new ContextDecrypter(decrypter);
	context.decrypt();
	
	expect(decrypter.decrypt).toHaveBeenCalled();
  });
});