function minimaxValue(state) {
    if (state.isTerminal()) {
        //a terminal game state is the base case
        return Game.score(state);
    } else {
        var stateScore; // this stores the minimax value we'll compute

        if (state.turn === "X")
        // X maximizs --> initialize to a value smaller than any possible score
            stateScore = -1000;
        else
        // O minimizes --> initialize to a value larger than any possible score
            stateScore = 1000;

        var availablePositions = state.emptyCells();

        //enumerate next available states using the info form available positions
        var availableNextStates = availablePositions.map(function (pos) {
            var action = new AIAction(pos);

            var nextState = action.applyTo(state);

            return nextState;
        });

        availableNextStates.forEach(function (nextState) {

            var nextScore = minimaxValue(nextState); //recursive call

            if (state.turn === "X") {
                // X wants to maximize --> update stateScore iff nextScore is larger
                if (nextScore > stateScore)
                    stateScore = nextScore;
            } else {
                // O wants to minimize --> update stateScore iff nextScore is smaller
                if (nextScore < stateScore)
                    stateScore = nextScore;
            }
        });

        //backup the minimax value
        return stateScore;
    }
}