var Player = function (name, symbol) {
    this.name = name;
    this.symbol = symbol;
};

/*
 * private function: make the ai player take a master move,
 * that is: choose the optimal minimax decision
 * @param turn [String]: the player to play, either X or O
 */
Player.prototype.takeAMasterMove = function (game, symbol) {
    var game = game;
    var moves = game.board.getSymbols();

    //enumerate and calculate the score for each avaialable actions to the ai player
    var availableActions = [];

    for (var i = 0; i < moves.length; i++) {

        if (moves[i] === "") {


            var action = new AIAction(i); //create the action object
            //get next state by applying the action
            var next = action.applyTo(game);

            //calculate and set the action's minmax value
            action.minimaxVal = minimax(next);
            availableActions.push(action);
        }
    }

    //sort the enumerated actions list by score
    if (symbol === "X")
    //X maximizes --> descend sort the actions to have the largest minimax at first
        availableActions.sort(AIAction.DESCENDING);
    else
    //O minimizes --> acend sort the actions to have the smallest minimax at first
        availableActions.sort(AIAction.ASCENDING);


    //take the first action as it's the optimal
    var chosenAction = availableActions[0];
    // var next = chosenAction.applyTo(game.currentState);

    // this just adds an X or an O at the chosen position on the board in the UI
    game.board.update(chosenAction.movePosition, symbol);

    game.board.displayBoard();

    if (game.isTerminal()) {
        alert(game.result);
        window.location.reload();
        return;
    }

};