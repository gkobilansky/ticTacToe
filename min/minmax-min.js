function minimaxValue(n){if(n.isTerminal())return Game.score(n);var r;r="X"===n.turn?-1e3:1e3;var a=n.emptyCells(),e=a.map(function(r){var a=new AIAction(r),e=a.applyTo(n);return e});return e.forEach(function(a){var e=minimaxValue(a);"X"===n.turn?e>r&&(r=e):r>e&&(r=e)}),r}