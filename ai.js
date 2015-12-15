//var AI = function (level) {
//    var levelOfIntelligence = level;
//
//
//};

var AIAction = function (move) {

    // public : the position on the board that the action would put the letter on
    this.movePosition = move;

    //public : the minimax value of the state that the action leads to when applied
    this.minimaxVal = 0;



    /*
     * public : applies the action to a state to get the next state
     * @param board: the state to apply the action to
     * @return [State]: the next board
     */
    this.applyTo = function (game) {

        var squares = game.board.squares;
        var next = new Game(squares);
        var oldGrid = game.board.grid;

        next.board.buildBoard();

        for (var i = 0; i < oldGrid.length; i++) {

            if (oldGrid[i].isOccupied()) {

                var symbol = oldGrid[i].getSymbol();
                next.board.grid[i].setSymbol(symbol);
            }
        }

        //   console.log(next.board.grid, next.board.filledSquares, 'new game log');
        next.board.filledSquares = game.board.filledSquares;

        var currentPlayer = next.getCurrentPlayer();
        var num = this.movePosition;


        //   console.log(currentPlayer, num);

        //put the letter on the board
        next.board.update(num, currentPlayer.symbol);


        return next;

    };
};

/*
 * public static method that defines a rule for sorting AIAction in ascending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.ASCENDING = function (firstAction, secondAction) {
    if (firstAction.minimaxVal < secondAction.minimaxVal) {
        return -1; //indicates that firstAction goes before secondAction
    } else if (firstAction.minimaxVal > secondAction.minimaxVal) {
        return 1; //indicates that secondAction goes before firstAction
    } else {
        return 0; //indicates a tie
    }
};

/*
 * public static method that defines a rule for sorting AIAction in descending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.DESCENDING = function (firstAction, secondAction) {
    if (firstAction.minimaxVal > secondAction.minimaxVal) {
        return -1; //indicates that firstAction goes before secondAction
    } else if (firstAction.minimaxVal < secondAction.minimaxVal) {
        return 1; //indicates that secondAction goes before firstAction
    } else {
        return 0; //indicates a tie
    }
};



// minimax algorithm
var minimax = function (game) {

    var over = game.isTerminal();
    var score = game.score();


    // console.log(over, game)

    if (over === true) {
        //a terminal game state is the base case
        return score;

    } else {
        var gameScore;

        // console.log('game not terminal')

        if (game.getCurrentPlayer().symbol === 'X') {
            gameScore = -1000;
        } else {
            gameScore = 1000;
        }

        var grid = game.board.grid;


        var availableNextStates = [];

        for (var i = 0; i < grid.length; i++) {
            if (!grid[i].isOccupied()) {

                var action = new AIAction(i);
                var nextGame = action.applyTo(game);

                console.log(nextGame);

                availableNextStates.push(nextGame);

            }
        };

        // console.log(availableNextStates);



        for (var i = 0; i < availableNextStates.length; i++) {

            var nextState = availableNextStates[i];

            var nextScore = minimax(nextState); //recursive call

            console.log(nextScore);

            if (game.getCurrentPlayer().symbol === "X") {
                // X wants to maximize --> update gameScore iff nextScore is larger
                if (nextScore > gameScore)
                    gameScore = nextScore;
            } else {
                // O wants to minimize --> update stateScore iff nextScore is smaller
                if (nextScore < gameScore)
                    gameScore = nextScore;

            }
        };


        //backup the minimax value
        return gameScore;
    }
}