describe("Finding keys and values", function() {
  it("It is possible to find Key", function() {
    var value = '123456';
    var responseText = "name=\"jk\" value=\"function () { return '" + value + "'; }\"";

    var finder = new linkslockr.KeyValueFinder(responseText);
    var key = finder.getKey(34);

    expect(key == value).toBe(true);
  });

  it("It is possible to find Value", function() {
    var value = '123456';
    var responseText = 'name="crypted" value=\"' + value + '"';

    var finder = new linkslockr.KeyValueFinder(responseText);
    var key = finder.getValue(17);

    expect(key == value).toBe(true);
  });
});