function Game(squares) {

    // setup & handle event listener
    this.init = function () {
        document.getElementById("game").addEventListener("click", this, false);
    };

    this.handleEvent = function (e) {
        this.play(e);
    };


    // create board and players
    this.board = new Board(squares);
    this.board.buildBoard();

    this.players = [];
    this.players[0] = new Player('player', 'X');
    this.players[1] = new Player('opponent', 'O');


    this.getCurrentPlayer = function () {
        return this.players[this.board.filledSquares % 2];
    };

    this.play = function (e) {

        if (this.isTerminal()) {
            alert(this.result);

        } else {

            var currentPlayer = this.getCurrentPlayer();
            var symbol = currentPlayer.symbol;
            var game = this;

            if (symbol === 'X') {

                var num = e.target.dataset.num;

                this.board.update(num, symbol);

                this.board.displayBoard();
                this.play();

            } else {

                currentPlayer.takeAMasterMove(game, symbol);


            }
        }
    };

    this.score = function () {

        if (this.result === 'X-won') {
            return 10 - this.board.filledSquares;
        } else if (this.result === 'O-won') {
            return -10 + this.board.filledSquares;
        } else {
            return 0;
        }
    };

    /* NOTE: Win checks are hardcoded for now
     * public  function that checks if the game is a terminal state or not
     * the state result is updated to reflect the result of the game
     * @returns [Boolean]: true if it's terminal, false otherwise
     */
    this.isTerminal = function () {
        var i, j, G = this.board.getSymbols();
        var movesLeft = G.indexOf("");

        //check rows
        for (i = 0; i <= 6; i = i + 3) {

            if (G[i] !== "" && G[i] === G[i + 1] && G[i + 1] === G[i + 2]) {
                this.result = G[i] + "-won"; //update the game result
                return true;
            }
        }


        //check columns
        for (i = 0; i <= 2; i++) {

            if (G[i] !== "" && G[i] === G[i + 3] && G[i + 3] === G[i + 6]) {
                this.result = G[i] + "-won"; //update the game result
                return true;
            }
        }

        //check diagonals
        for (i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            if (G[i] !== "" && G[i] === G[i + j] && G[i + j] === G[i + 2 * j]) {
                this.result = G[i] + "-won"; //update the state result
                return true;
            }
        }
        if (this.board.filledSquares > 7 || movesLeft === -1) {
            //the game is draw
            this.result = "draw"; //update the state result
            return true;
        } else {
            return false;
        }
    };

}




(function GameStarter() {
    var tictactoegame = new Game(3);
    tictactoegame.init();
    tictactoegame.board.displayBoard();
    // console.log(tictactoegame);
    // tictactoegame.play();
})();