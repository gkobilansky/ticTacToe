function Game(t){this.init=function(){document.getElementById("game").addEventListener("click",this,!1)},this.handleEvent=function(t){this.play(t)},this.board=new Board(t),this.board.buildBoard(),this.players=[],this.players[0]=new Player("player","X"),this.players[1]=new Player("opponent","O"),this.getCurrentPlayer=function(){var t=this.board.getFilled();return this.players[t%2]},this.play=function(t){if(this.isTerminal())alert(this.result);else{var e=this.getCurrentPlayer(),r=e.symbol,i=this;if("X"===r){var s=t.target.dataset.num;this.board.update(s,r),this.board.displayBoard(),this.play()}else e.takeAMasterMove(i,r),this.isTerminal()&&alert(this.result)}},this.score=function(){var t=this.board.getFilled();return"X-won"===this.result?10-t:"O-won"===this.result?-10+t:0},this.isTerminal=function(){var t,e,r=this.board.getSymbols(),i=this.board.getFilled();for(t=0;6>=t;t+=3)if(""!==r[t]&&r[t]===r[t+1]&&r[t+1]===r[t+2])return this.result=r[t]+"-won",!0;for(t=0;2>=t;t++)if(""!==r[t]&&r[t]===r[t+3]&&r[t+3]===r[t+6])return this.result=r[t]+"-won",!0;for(t=0,e=4;2>=t;t+=2,e-=2)if(""!==r[t]&&r[t]===r[t+e]&&r[t+e]===r[t+2*e])return this.result=r[t]+"-won",!0;return i>=9?(this.result="draw",!0):!1}}!function t(){var t=new Game(3);t.init(),t.board.displayBoard()}();