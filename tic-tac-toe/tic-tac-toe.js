'use strict';
(function() {

var TicTacToe = function(playerMarker, compMarker) {
    
    // Set vars
    var playerMarkStyle = playerMarker;
    var compMarkStyle = compMarker;
    var board = ['','','','','','','','',''];
    var currentTurn = '';
    var r = 0;
    var gameOver = false;
    var cHistory = [];
    var compMark;
    
    //Run computers turn
    this.compTurn = function() {
        //Set Turn Flag
        currentTurn = 'computer';
        
        //Run decision tree function to get next computer move
        compMark = compDecision(r, cHistory, compMark);

        //Save move in history for future reference
        cHistory.push(compMark);
        
        // Mark board array
        board[compMark] = compMarkStyle;

        //Update UI
        var compSquare = "s" + compMark + "";
        var compValue = "<span class='marker'>" + compMarkStyle + "</span>";
        document.getElementById(compSquare).innerHTML = compValue;

        // Check the board
        this.turnCheck();
    }

    //Computer move decision logic
    function compDecision(r, cHistory, compMark) {

        if ( r === 0 ) {

          switch (Math.floor(Math.random() * 4)) {
            case 0:
              compMark = 0;
              break;
            case 1:
              compMark = 2;
              break;
            case 2:
              compMark = 6;
              break;
            case 3:
              compMark = 8;
              break;
            default:
              break;
          }

        } else if ( r === 2 ) {
            
            switch (compMark) {
              case 0:
                if ( board[8] === '' ) {
                  compMark = 8;
                } else if ( board[6] === '' ) {
                  compMark = 6;
                } else if ( board[2] === '' ) {
                  compMark = 2;
                }
                break;
              case 2:
                if ( board[6] === '' ) {
                  compMark = 6;
                } else if ( board[8] === '' ) {
                  compMark = 8;
                } else if ( board[0] === '' ) {
                  compMark = 0;
                }
                break;
              case 6:
                if ( board[2] === '' ) {
                  compMark = 2;
                } else if ( board[8] === '' ) {
                  compMark = 8;
                } else if ( board[0] === '' ) {
                  compMark = 0;
                }
                break;
              case 8:
                if ( board[0] === '' ) {
                  compMark = 0;
                } else if ( board[6] === '' ) {
                  compMark = 6;
                } else if ( board[2] === '' ) {
                  compMark = 2;
                }
                break;
              default:
                break;
            }

        } else if (r === 4 ) {

            // Defensive check first
            if ( board[4] === playerMarkStyle && board[7] === playerMarkStyle ) {
                compMark = 1;
            } else if ( board[4] === playerMarkStyle && board[3] === playerMarkStyle ) {
                compMark = 5;
            } else if ( board[4] === playerMarkStyle && board[5] === playerMarkStyle ) {
                compMark = 3;
            } else if ( board[4] === playerMarkStyle && board[1] === playerMarkStyle ) {
                compMark = 7;
            } else {

                // Decide on offensive move
                if ( cHistory.includes(0) && cHistory.includes(2) ) {
                  if ( board[1] === '' ) {
                    compMark = 1;
                    } else if ( board[8] === '' ) {
                      compMark = 8;
                    } else if ( board[6] === '') {
                      compMark = 6;
                    }
                  }

                if ( cHistory.includes(0) && cHistory.includes(8) ) {
                  if ( board[4] === '' ) {
                    compMark = 4;
                  } else if ( board[2] === '') {
                    compMark = 2;
                  } else if ( board[6] === '') {
                    compMark = 6;
                  }
                }

                if ( cHistory.includes(0) && cHistory.includes(6) ) {
                  if ( board[3] === '' ) {
                    compMark = 3;
                  } else if ( board[2] === '' ) {
                    compMark = 2;
                  } else if ( board[8] === '') {
                    compMark = 8;
                  }
                }

                if ( cHistory.includes(2) && cHistory.includes(8) ) {
                  if ( board[5] === '' ) {
                    compMark = 5;
                  } else if ( board[0] === '' ) {
                    compMark = 0;
                  } else if ( board[6] === '' ) {
                    compMark = 6;
                  }
                }

                if ( cHistory.includes(2) && cHistory.includes(6) ) {
                  if ( board[4] === '' ) {
                    compMark = 4;
                  } else if ( board[8] === '' ) {
                    compMark = 8;
                  } else if ( board[0] === '' ) {
                    compMark = 0;
                  }
                }

                if ( cHistory.includes(6) && cHistory.includes(8) ) {
                  if ( board[7] === '' ) {
                    compMark = 7;
                  } else if ( board[0] === '' ) {
                    compMark = 0;
                  } else if ( board[2] === '' ) {
                    compMark = 2;
                  }
                }
            }

        } else if ( r === 6 ) {

            //Check for player mistakes after a defensive move
            if ( board[1] === playerMarkStyle && board[4] === playerMarkStyle && board[6] === '' ) {
                compMark = 6;
            } else if ( board[1] === playerMarkStyle && board[4] === playerMarkStyle && board[8] === '' ) {
                compMark = 8;
            } else if ( board[4] === playerMarkStyle && board[7] === playerMarkStyle && board[0] === '' ) {
                compMark = 0;
            } else if ( board[4] === playerMarkStyle && board[7] === playerMarkStyle && board[2] === '' ) {
                compMark = 2;
            } else if ( board[3] === playerMarkStyle && board[4] === playerMarkStyle && board[2] === '') {
                compMark = 2;
            } else if ( board[3] === playerMarkStyle && board[4] === playerMarkStyle && board[8] === '') {
                compMark = 8;
            } else if ( board[4] === playerMarkStyle && board[5] === playerMarkStyle && board[0] === '' ) {
                compMark = 0;
            } else if ( board[4] === playerMarkStyle && board[5] === playerMarkStyle && board[6] === '' ) {
                compMark = 6;

            // Continue defense if player successfully blocks
            } else if ( cHistory.includes(1) ) {
                if ( board[6] === '' ) {
                    compMark = 6;
                } else if ( board[8] === '' ) {
                    compMark = 8;
                }
            } else if ( cHistory.includes(3) ) {
                if ( board[2] === '' ) {
                    compMark = 2;
                } else if ( board[8] === '' ) {
                    compMark = 8;
                }
            } else if ( cHistory.includes(5) ) {
                if ( board[0] === '' ) {
                    compMark = 0;
                } else if ( board[6] === '' ) {
                    compMark = 6;
                }
            } else if ( cHistory.includes(7) ) {
                if ( board[0] === '' ) {
                    compMark = 0;
                } else if ( board[2] === '' ) {
                    compMark = 2;
                }

            } else {

                //Offensive moves
                if ( cHistory.includes(0) && cHistory.includes(2) && cHistory.includes(8) ) {
                  if ( board[4] === '' ) {
                    compMark = 4;
                  } else if ( board[1] === '' ) {
                    compMark = 1;
                  } else if ( board[5] === '' ) {
                    compMark = 5;
                  }
                }

                if ( cHistory.includes(0) && cHistory.includes(2) && cHistory.includes(6) ) {
                  if ( board[4] === '' ) {
                    compMark = 4;
                  } else if ( board[3] === '' ) {
                    compMark = 3;
                  } else if ( board[1] === '' ) {
                    compMark = 1;
                  }
                }

                if ( cHistory.includes(0) && cHistory.includes(6) && cHistory.includes(8) ) {
                  if ( board[4] === '' ) {
                    compMark = 4;
                  } else if ( board[3] === '' ) {
                    compMark = 3;
                  } else if ( board[7] === '' ) {
                    compMark = 7;
                  }
                }

                if ( cHistory.includes(2) && cHistory.includes(8) && cHistory.includes(6) ) {
                  if ( board[4] === '' ) {
                    compMark = 4;
                  } else if ( board[5] === '' ) {
                    compMark = 5;
                  } else if ( board[7] === '' ) {
                    compMark = 7;
                  }
                }
            }//Close else before offensive moves

          } else if ( r === 8 ) {

            compMark = board.indexOf('');

        }//End Round 8
        
          return compMark;
    }

    this.playerTurn = function(space) {
        
        //Set Turn Flag
        currentTurn = 'player';

        //Get index to update board
        space = space.slice(1);

        // If clicked space is blank, run stuff
        if ( board[space] === '' ) {
            
            //Mark board array
            board[space] = playerMarkStyle;
            
            //Update UI
            var playerSquare = "s" + space + "";
            var playerValue = "<span class='marker'>" + playerMarkStyle + "</span>";
            document.getElementById(playerSquare).innerHTML = playerValue;

            //Check the board for wins
            this.turnCheck();
        }
        // Else tell the user they need to select an un-used space
    }

    // Checks for end-game scenario at end of each turn
    this.turnCheck = function() {

        var checks = [[board[0], board[1], board[2]],[board[3], board[4], board[5]],[board[6], board[7], board[8]],[board[0], board[3], board[6]],[board[1], board[4], board[7]],[board[2], board[5], board[8]],[board[0], board[4], board[8]],[board[2], board[4], board[6]]];
        var match;

        // End game if someone wins or there is a tie
        if ( currentTurn === 'player' && boardReview('player') ) {
            return this.endGame('playerWon', match);
        } else if ( currentTurn === 'computer' && boardReview('computer') ) {
            return this.endGame('compWon', match);
        } else if ( r === 8 ) {
            return this.endGame('draw');
        }

        //Helper function to check for a match
        function boardReview(focus) {
        
            for (var x = checks.length - 1; x >= 0; x--) {
                switch(focus) {
                    case 'player':
                        if ( checks[x].every( el => el === playerMarkStyle ) ) {
                            match = x;
                            return true;
                        }
                        break;

                    case 'computer':
                        if ( checks[x].every( el => el === compMarkStyle) ) {
                            match = x;
                            return true;
                        }
                        break;
                }
            }

            return false;
        };

        // Advance the game to next turn
        r++;
        if ( currentTurn === 'player' && gameOver === false ) {
            this.compTurn();
        }

    }

    //Helper function to end the game
    this.endGame = function(result, checkIndex) {

        gameOver = true;

        switch(result) {
            case 'playerWon':
                highlight(checkIndex, 'player');
                $('#board').append('<div id="modal-result">YOU WIN!</div>');
                window.setTimeout(boardReset, 2000);
                break;
            case 'compWon':
                highlight(checkIndex, 'computer');
                $('#board').append('<div id="modal-result">YOU LOSE!</div>');
                window.setTimeout(boardReset, 2000);
                break;
            case 'draw':
                $('#board').append('<div id="modal-result">DRAW!</div>');
                window.setTimeout(boardReset, 2000);
                break;
            default:
                break;
        }

        function highlight(checkIndex, theWinner) {
            
            var winners = [];
            var winLine;

            if ( theWinner === 'player' ) {
                winLine = 'win-line';
            } else {
                winLine = 'lose-line';
            }

            switch(checkIndex) {
                case 0:
                    winners = ['s0','s1','s2'];
                    for(var x=0; x<winners.length; x++) {
                        document.getElementById(winners[x]).classList.add(winLine);
                    }
                break;
                    
                case 1:
                    winners = ['s3','s4','s5'];
                    for(var x=0; x<winners.length; x++) {
                        document.getElementById(winners[x]).classList.add(winLine);
                    }
                break;

                case 2:
                    winners = ['s6','s7','s8'];
                    for(var x=0; x<winners.length; x++) {
                        document.getElementById(winners[x]).classList.add(winLine);
                    }
                break;

                case 3:
                    winners = ['s0','s3','s6'];
                    for(var x=0; x<winners.length; x++) {
                        document.getElementById(winners[x]).classList.add(winLine);
                    }
                break;

                case 4:
                    winners = ['s1','s4','s7'];
                    for(var x=0; x<winners.length; x++) {
                        document.getElementById(winners[x]).classList.add(winLine);
                    }
                break;

                case 5:
                    winners = ['s2','s5','s8'];
                    for(var x=0; x<winners.length; x++) {
                        document.getElementById(winners[x]).classList.add(winLine);
                    }
                break;

                case 6:
                    winners = ['s0','s4','s8'];
                    for(var x=0; x<winners.length; x++) {
                        document.getElementById(winners[x]).classList.add(winLine);
                    }
                break;

                case 7:
                    winners = ['s2','s4','s6'];
                    for(var x=0; x<winners.length; x++) {
                        document.getElementById(winners[x]).classList.add(winLine);
                    }
                break;
            }
        }

        function boardReset() {
            //Reset Vars
            board = ['','','','','','','','',''];
            currentTurn = '';
            r = 0;
            gameOver = false;
            cHistory = [];

            //Reset UI
            var squares = document.getElementsByClassName('square');
            for(var i = 0; i < squares.length; i++) {  
              squares[i].innerHTML = '';
            }
            $('.win-line').removeClass('win-line');
            $('.lose-line').removeClass('lose-line');
            $('#modal-result').remove();

            //Computer always goes first
            game.compTurn();
        }

    }
    

    this.compTurn();

}

//Modal starts a new game
var game;
var userChoice;
// Click event for x
document.getElementById('x').addEventListener("click", () => {
      userChioce = x;
      game = new TicTacToe('x','o');
      //Hide Modal Box
      document.getElementById('modal').classList.add('closed');
});
// Click event for o
document.getElementById('o').addEventListener("click", () => {
      userChoice = o;
      game = new TicTacToe('o','x');
      //Hide Modal Box
      document.getElementById('modal').classList.add('closed');
});

// Helper function to get the id of the square the player clicks on
var squareId = function() {
  var attribute = this.getAttribute("id")
  return attribute;
}

// Watch squares for player clicks
var squares = document.getElementsByClassName('square');
for(var i = 0; i < squares.length; i++) {  
  squares[i].addEventListener("click", function(e) {
    game.playerTurn(e.target.id);
  });
}

//polyfill for includes method
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}
})();