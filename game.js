function Game(squares) {

    // setup & handle event listener
    this.players = [];


    this.init = function () {
        document.getElementById("game").addEventListener("click", this, false);
        document.getElementById("compFirst").addEventListener("click", this, false);
    };

    this.handleEvent = function (e) {

        if (e.target.id === "compFirst") {
            this.players[0].name = "comp";
            this.players[1].name = "human";
        }

        this.play(e);

    };


    // create board and players
    this.board = new Board(squares);
    this.board.buildBoard();

    this.players[0] = new Player('human', 'X');
    this.players[1] = new Player('comp', 'O');


    this.getCurrentPlayer = function () {
        var filled = this.board.getFilled();
        return this.players[filled % 2];
    };

    this.play = function (e) {

        if (this.isTerminal()) {
            document.getElementById("gameResult").innerText = this.result;
            document.getElementById('reload').className = '';
            return;
        }

        const currentPlayer = this.getCurrentPlayer();
        const name = currentPlayer.name;
        const symbol = currentPlayer.symbol;
        const game = this;

        if (name === 'human') {

            var num = e.target.dataset.num;
            this.board.update(num, symbol);
            this.board.displayBoard();
            this.play();

        } else {

            currentPlayer.takeAMasterMove(game, symbol);

        }


    };

    this.score = function () {


        var filled = this.board.getFilled();

        if (this.result === 'X-won') {
            return 10 - filled;
        } else if (this.result === 'O-won') {
            return -10 + filled;
        } else {
            return 0;
        }
    };

    /* NOTE: Win checks are hardcoded for TicTacToe
     * returns result twice for some reason. 
     * public  function that checks if the game is a terminal state or not
     * the state result is updated to reflect the result of the game
     * @returns [Boolean]: true if it's terminal, false otherwise
     */
    this.isTerminal = function () {
        var i, j, G = this.board.getSymbols();
        var filled = this.board.getFilled();

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
        if (filled >= 9) {
            //the game is draw
            this.result = "Draw"; //update the state result
            return true;
        } else {
            return false;
        }
    };

}


(function GameStarter() {
    var tictactoegame = new Game(3); // pass 3 squares for TicTacToe, TODO make isTerminal dependant on squares
    tictactoegame.init();
    tictactoegame.board.displayBoard();
})();