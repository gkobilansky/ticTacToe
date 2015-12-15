//var game = new Object();
//
//var winConditions = [
//
//    's1 == s2 && s2 == s3',
//
//
//]

// Random play

var gameOver = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var squares = document.getElementsByClassName('square'); //all the nodes we'll be working with


var winCheck = function () { // this is ugly, but does the job. checks each possible win condition, set gameOver to true, so comp doesn't keep playing 

    if (squares[0].innerText !== '' && squares[0].innerText === squares[1].innerText && squares[1].innerText === squares[2].innerText) {
        alert(squares[0].innerText + 's Win'); //top row
        gameOver = true;
        location.reload();

    } else if (squares[3].innerText !== '' && squares[3].innerText === squares[4].innerText && squares[4].innerText === squares[5].innerText) {
        alert(squares[3].innerText + 's Win'); //middle row
        gameOver = true;
        location.reload();

    } else if (squares[6].innerText !== '' && squares[6].innerText === squares[7].innerText && squares[7].innerText === squares[8].innerText) {
        alert(squares[6].innerText + 's Win'); //bottom row
        gameOver = true;
        location.reload();

    } else if (squares[0].innerText !== '' && squares[0].innerText === squares[3].innerText && squares[3].innerText === squares[6].innerText) {
        alert(squares[0].innerText + 's Win'); // first column
        gameOver = true;
        location.reload();

    } else if (squares[1].innerText !== '' && squares[1].innerText === squares[4].innerText && squares[4].innerText === squares[7].innerText) {
        alert(squares[1].innerText + 's Win'); // second column
        gameOver = true;
        location.reload();

    } else if (squares[2].innerText !== '' && squares[2].innerText === squares[5].innerText && squares[5].innerText === squares[8].innerText) {
        alert(squares[2].innerText + 's Win'); // third column
        gameOver = true;
        location.reload();

    } else if (squares[0].innerText !== '' && squares[0].innerText === squares[4].innerText && squares[4].innerText === squares[8].innerText) {
        alert(squares[0].innerText + 's Win'); // first diagonal
        gameOver = true;
        location.reload();

    } else if (squares[2].innerText !== '' && squares[2].innerText === squares[4].innerText && squares[4].innerText === squares[6].innerText) {
        alert(squares[2].innerText + 's Win'); // second diagonal
        gameOver = true;
        location.reload();
    }
};


// Playing X's & O's



var compPlay = function () {

    winCheck(); // check win conditions, if human won, set gameOver to true, so nothing else happens.

    if (gameOver === false) {

        var emptySqrs = [];
        var compSqrs = [];
        var humSqrs = [];


        // capturing positions for AI implementation    
        for (var prop in squares) {

            if (squares[prop].innerText === '') {
                emptySqrs.push(squares[prop]);
            } else if (squares[prop].innerText === 'O') {
                compSqrs.push(squares[prop]);
            } else if (squares[prop].innerText === 'X') {
                humSqrs.push(squares[prop]);
            }
        };


        console.log(emptySqrs, emptySqrs.length, compSqrs, compSqrs.length);



        if (emptySqrs.length === 0) { // if there's no more empty squares, its a tie
            alert('It\'s a tie!');
            location.reload();
        } else {

            // if middle is empty, let's play in the middle

            if (emptySqrs.indexOf(squares[4]) !== -1) {
                var idx = emptySqrs.indexOf(squares[4]);
                emptySqrs[idx].innerText = 'O';

                // random for now, let's add more AI later

            } else {
                emptySqrs[getRandomInt(0, emptySqrs.length - 1)].innerText = 'O';
            }
        }

        winCheck();
    }



};



var humanPlay = function () {


    if (this.innerText === '') {
        this.innerText = 'X';
    }

    compPlay();

};

// Event listeners

for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', humanPlay, false);
}