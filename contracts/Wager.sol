//pragma solidity ^0.4.1;

contract Wager {
    
    struct Punter {
        address id;
        uint8 bet; // index into the bets array
        uint8 odds; // when bet was placed, in units of 0/256
        uint256 stake; // in wei
    }
    struct Bet {
        string outcome;
        uint8 currentOdds; // in units of 0/256
    }
    address bookmaker;
    mapping(address => Punter) punters;
    Bet[] bets;
    uint8 betsDefined;
    
    function Wager(uint8 _numBets) {
        bookmaker = msg.sender;
        bets.length = _numBets;
        betsDefined = 0;
    }

    function _bookmaker() constant returns (address) {
        return bookmaker;
    }

    function validateBet (address sender) private constant returns (uint8) {
        if (msg.sender != bookmaker) {
            return 1;
        }
        if (betsDefined >= bets.length) {
            return 2;
        }
        return 0;
    }

    function addBet (string _outcome, uint8 initialOdds) returns (uint8) {
        var status = validateBet (msg.sender);
        if (status == 0) {
            bets[betsDefined] = Bet (_outcome, initialOdds);
            betsDefined++;
        }
        return status;
    }

    function adjustOdds (string _outcome, uint8 newOdds) {
        
    }
    
    function placeBet (string _outcome, uint256 stake) {
        
    }
}