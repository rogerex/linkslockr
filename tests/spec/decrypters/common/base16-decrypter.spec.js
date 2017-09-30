describe("Base16 Decrypter", function() {
  it("It is Valid for decryption without pre callback", function() {
    var key = '1234567890987654';
    var encrypted = '31323334353637383930393837363534';

    var decrypter = new linkslockr.Base16Decrypter();
    var result = decrypter.decrypt(encrypted);

    expect(key === result).toBe(true);
  });
  
  it("It is Valid for decryption with pre callback", function() {
    var key = '1234567890987654';
    var encrypted = '313233343536373839303938373';

    var decrypter = new linkslockr.Base16Decrypter();
    var result = decrypter.decrypt(encrypted, function(code) { return code + "63534"; });

    expect(key == result).toBe(true);
  });
});