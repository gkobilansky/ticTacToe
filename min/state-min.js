var State=function(t){if(this.turn="",this.oMovesCount=0,this.result="still running",this.board=[],"undefined"!=typeof t){var r=t.board.length;this.board=new Array(r);for(var s=0;r>s;s++)this.board[s]=t.board[s];this.oMovesCount=t.oMovesCount,this.result=t.result,this.turn=t.turn}this.advanceTurn=function(){this.turn="X"===this.turn?"O":"X"},this.emptyCells=function(){for(var t=[],r=0;9>r;r++)"E"===this.board[r]&&t.push(r);return t},this.isTerminal=function(){for(var t=this.board,r=0;6>=r;r+=3)if("E"!==t[r]&&t[r]===t[r+1]&&t[r+1]==t[r+2])return this.result=t[r]+"-won",!0;for(var r=0;2>=r;r++)if("E"!==t[r]&&t[r]===t[r+3]&&t[r+3]===t[r+6])return this.result=t[r]+"-won",!0;for(var r=0,s=4;2>=r;r+=2,s-=2)if("E"!==t[r]&&t[r]==t[r+s]&&t[r+s]===t[r+2*s])return this.result=t[r]+"-won",!0;var n=this.emptyCells();return 0==n.length?(this.result="draw",!0):!1}};