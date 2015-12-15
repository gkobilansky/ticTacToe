//Square class
function Square() {
    this.symbol = '';
}

Square.prototype.isOccupied = function () {
    if (this.symbol != '') {
        return true;
    } else {
        return false;
    }
};

//Based on player turn set symbols
Square.prototype.setSymbol = function (value) {
    //    if (this.isOccupied) {
    //        alert('This square is already filled');
    //    } else {
    this.symbol = value;
    //    }
};

Square.prototype.getSymbol = function () {
    return this.symbol;
};