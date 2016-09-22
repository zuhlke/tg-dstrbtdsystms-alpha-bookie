contract Book {
    struct Bet {
        address bettor;
        uint amount;
        bytes32 bettingOn;
    }

    address bookmaker;
    bytes32[] possibleOutcomes;
    Bet[] bets;
    mapping(bytes32 => uint) amountsByOutcome;
    uint potSize;

    function Book() {
        bookmaker = msg.sender;
    }

//    function Book(bytes32[] outcomes) {
//        bookmaker = msg.sender;
//        possibleOutcomes = outcomes;
//    }

    function setOutcomes(bytes32[] outcomes) {
        possibleOutcomes = outcomes;
    }

    function bet(bytes32 outcome) {
        bets.push(Bet(msg.sender, msg.value, outcome));
        amountsByOutcome[outcome] += msg.value; // TODO is 0 the default value?
        potSize += msg.value;
    }

    function setResult(bytes32 outcome) {
        if(msg.sender != bookmaker) throw;
        
        for(uint i = 0; i < bets.length; i++) {
            Bet bet = bets[i];
            if(bet.bettingOn == outcome) {
                uint amount = potSize * bet.amount / amountsByOutcome[outcome];
                if(!bet.bettor.send (amount)) {
                    throw;
                }
            }
        }
    }

    function terminate() {
        if(msg.sender == bookmaker) {
            suicide(bookmaker);
        }
    }

    function() {
        throw; // prevents accidental accumulation of ether
    }
}
