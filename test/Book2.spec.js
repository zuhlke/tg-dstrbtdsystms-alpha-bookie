contract('Book', function(accounts) {
  it("should kill the contract on terminate call", function() {
    var book = Book.new(["Rain", "Shine"]);
    

    return book.setResult.call("Rain", {from:accounts[0]}).then(function(winnings) {
      assert.equal(winnings.valueOf(), 0, "Winnings was meant to be 0");
      return book.terminate.call().then(function(profit) {
        assert.equal(profit.valueOf(), 0, "Profit should have been 0");
        return book.bet.call("Rain").then(function() {
          assert.fail("Should not have been able to call terminated contract");
        });
      });
    });
  });
});
