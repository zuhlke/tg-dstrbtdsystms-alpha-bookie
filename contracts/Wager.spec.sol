import 'dapple/test.sol'; // virtual "dapple" package imported when `dapple test` is run

import 'Wager.sol';

contract WagerTest is Test {
    Wager wager;
    Tester proxy_tester;

    function setUp() {
        wager = new Wager(4);
        proxy_tester = new Tester();
        proxy_tester._target(wager);
    }

    function testBookmakerShouldBeCreator() {
        assertEq(address(this), wager._bookmaker());
    }
}