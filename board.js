//Board Class
function Board(squares) {

    this.squares = squares;
    this.grid = [];
    this.gameBoard = document.getElementById("game");
};

//Builds board based on number of squares
Board.prototype.buildBoard = function () {
    var i;
    for (i = 0; i < this.squares * this.squares; i++) {
        this.grid[i] = new Square();
    }
};

//Updates board on turn
Board.prototype.update = function (index, symbol) {
    this.grid[index].setSymbol(symbol);
};

//Build HTML of current state
Board.prototype.displayBoard = function () {
    var i, j, board = '<div class="board">';
    for (i = 0; i < this.grid.length; i++) {
        board += '<div class="square" data-num="' + i + '">' + this.grid[i].getSymbol() + '</div>';
    }

    this.gameBoard.innerHTML = board;

};

//Get all symbols 
Board.prototype.getSymbols = function () {
    var allSymbols = [];
    for (i = 0; i < this.grid.length; i++) {

        allSymbols.push(
            this.grid[i].getSymbol()
        );

    }
    return allSymbols;
}

// Get filled squares
Board.prototype.getFilled = function () {
    var symbols = this.getSymbols();
    var filled = 0;

    for (var i = 0; i < symbols.length; i++) {
        if (symbols[i] !== "") {
            filled++;
        }
    }

    return filled;
}