const getBalance=web3.eth.getBalance;

contract('Book', function(accounts) {

  it("should allow happy path with bets submitted",function(done) {

    var book = Book.deployed();
    book.setOutcomes(["heads", "tails"]);

    var account_one = accounts[1];
    var account_two = accounts[2];

    var account_one_starting_balance = getBalance( account_one );
    var account_two_starting_balance = getBalance( account_two );
    var delta_starting_balance = account_two_starting_balance.minus(account_one_starting_balance);
    console.log( "account 1: starting balance: " + (account_one_starting_balance).toString() );
    console.log( "account 2: starting balance: " + (account_two_starting_balance).toString() );
    console.log( "delta of starting balances: " + (delta_starting_balance).toString() );

    var account_one_postbet_balance, account_two_postbet_balance;
    book.bet( "heads", { from : account_one , value : 100 }).then(function() {
      account_one_postbet_balance = getBalance( account_one );
      console.log( "account 1: post-bet balance: " + (account_one_postbet_balance).toString() ); //1.42575000000001E16
      return book.bet( "tails", { from : account_two , value : 200 });
    }).then(function() {
      account_two_postbet_balance = getBalance( account_two );
      console.log( "account 2: post-bet balance: " + (account_two_postbet_balance).toString() ); //1.12575000000002E16
//    assert.strictEqual( account_one_postbet_balance.plus(delta_starting_balance).plus(100).toString(),
//      account_two_postbet_balance.plus(200).toString(), "Expected post bet balances to differ by 100");
      return book.setResult( "tails" );
    }).then(function() {
      var account_one_final_balance = getBalance( account_one );
      var account_two_final_balance = getBalance( account_two );
      console.log( "account 1: final balance: " + (account_one_final_balance).toString() );
      console.log( "account 2: final balance: " + (account_two_final_balance).toString() );
      assert.equal( account_one_final_balance.toString(), account_one_postbet_balance.toString(),
        "Expected account 1 final balance to be unchanged since placing bet");
      assert.equal( account_two_final_balance.minus(300).toString(), account_two_postbet_balance.toString(),
        "Expected account 2 final balance to be 300 higher since placing bet");

      console.log( "account 1: gas used: " + account_one_starting_balance.minus(account_one_final_balance).minus(100).toString() );
      console.log( "account 2: gas used: " + account_two_starting_balance.minus(account_two_final_balance).plus(100).toString() );
      done();
    });
  });

//  it("should kill the contract on terminate call", function() {
//
//    var book = Book.new(["Rain", "Shine"]);
//
//
//    return book.setResult.call("Rain", {from:accounts[0]}).then(function(winnings) {
//      assert.equal(winnings.valueOf(), 0, "Winnings was meant to be 0");
//      return book.terminate.call().then(function(profit) {
//        assert.equal(profit.valueOf(), 0, "Profit should have been 0");
//        return book.bet.call("Rain").then(function() {
//          assert.fail("Should not have been able to call terminated contract");
//        });
//      });
//    });
//  });
});
