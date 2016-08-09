/* TODO:
- HTML5 Audio is not very responsive. Additional libraries may solve.
-- http://buzz.jaysalvat.com/
- Adjust styling needs for mobile.
- Test/Fix touch events.
-- http://hammerjs.github.io/
*/

var Simon = function() {  
    
    //Vars
    var says = [];
    var userTurn = false;
    var power = false;
    var sFlag = false;
    var pBDelay = 0;
    var pBCount = 0;
    var counter = 0;
    var blink = 0;
    var started = false;
    var compPBIn;
    var compPBOut;

    //Audio objects
    var green = document.createElement("audio");
        green.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
        green.autoPlay = false;
        green.preLoad = true;
    var red = document.createElement("audio");
        red.src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
        red.autoPlay = false;
        red.preLoad = true;
    var blue = document.createElement("audio");
        blue.src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
        blue.autoPlay = false;
        blue.preLoad = true;
    var yellow = document.createElement("audio");
        yellow.src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
        yellow.autoPlay = false;
        yellow.preLoad = true;

    this.powerButton = function() {
        switch(power) {
            case false:
                //Turn On
                power = true;
                $('#power').addClass('on');
                $('.c-pad').fadeIn(1000, () => {
                    $('.start, .strict, #screen').addClass('on');
                });
                
                break;

            case true:
                //Turn off
                power = false;
                $('.c-pad').fadeOut(1000);
                $('.c-pad, #power, .start, .strict, #screen, #go, #mode').removeClass('on');
                sFlag = false;
                reset();
                break;
        }

    }

    this.compTurn = function() {
        userTurn = false;
        var round = ( says.length + 1 );
        if ( round < 10 ) {
            round = '0' + round;
        }
        $('#screen span').text(round);
        if ( says.length < 20 ) {
            addToPattern();
            playBack();
            counter = 0;
        } else {
            endGame();
        }
    }

    function addToPattern() {
        var newColor = Math.floor(Math.random() * 4)
        
        switch(newColor) {
            case 0:
                newColor = 'g';
                break;
            case 1:
                newColor = 'r';
                break;
            case 2:
                newColor = 'b';
                break;
            case 3:
                newColor = 'y';
                break;
            default:
                break;
        }

        says.push(newColor);
    }

    function playBack() {

        if ( says.length > 12 ) {
            pBDelay = 350;
        } else if ( says.length > 8 ) {
            pBDelay = 550;
        } else if ( says.length > 4 ) {
            pBDelay = 800;
        } else {
            pBDelay = 1000;
        }

        runPB();

        function runPB() {
            
            compPBIn = setTimeout( () => {
                $("#" + says[pBCount]).addClass('illuminate');
                switch(says[pBCount]) {
                    case 'g':
                        green.play();
                        break;
                    case 'r':
                        red.play();
                        break;
                    case 'b':
                        blue.play();
                        break;
                    case 'y':
                        yellow.play();
                        break
                    default:
                        break;
                }

                compPBOut = setTimeout( () => {
                    $("#" + says[pBCount]).removeClass('illuminate');
                    pBCount++;
                    if ( pBCount < says.length ) {
                        runPB();
                    } else {
                        userTurn = true;
                        pBCount = 0;
                    }
                }, 300);

            }, pBDelay);
        }       
    }

    this.strictToggle = function() {
        switch(sFlag) {
            case false:
                //Turn On
                $('#mode').addClass('on');
                reset();
                sFlag = true;
                break;

            case true:
                //Turn off
                $('#mode').removeClass('on');
                reset();
                sFlag = false;
                break;
        }
    }

    this.isStarted = function() {
        return started;
    }

    this.setStarted = function() {
        started = true;
    }

    function reset() {
        says = [];
        userTurn = false;
        pBCount = 0;
        round = 0;
        started = false;
        counter = 0;
        //UI
        $('.illuminate').removeClass('illuminate');
        $('#screen span').text('- -');
        $('#go').removeClass('on');
    }

    function endGame() {

        var endCounter = 0;

        runEnd();

        function runEnd() {
            setTimeout( () => {
                $('.c-pad, #screen').addClass('win');
                $('#screen span').text('W');
                setTimeout( () => {
                    $('.c-pad, #screen').removeClass('win');
                    endCounter++;
                    if (endCounter < 4) {
                        runEnd();
                    } else {
                        setTimeout( () => {
                            powerButton();
                        }, 500);
                    }
                }, 500);
            }, 600);
        }
    }

    function screenBlinker() {
        $('#screen span').fadeOut(500);
        $('#screen span').fadeIn(500);
    }

    //User Turn
    $('.c-pad').on('touchstart click', function(e) {
        var targetId = e.target.id;
        event.stopPropagation();
        event.preventDefault();
      
        if ( userTurn === true) {
            if ( targetId !== says[counter] ) {
                userTurn = false;
                $('#screen span').fadeOut(500);
                $('#screen span').fadeIn(500);
                var myBlinky = setInterval(screenBlinker, 1000);
                
                //Let screen blink 3 more times then advance the game
                setTimeout( function() {
                    clearInterval(myBlinky);
                    if ( sFlag === true ) {
                        reset();
                    } else {
                        playBack();
                        counter = 0;
                    }
                }, 3500);

            } else {
                
                $("#" + targetId).addClass('illuminate');
                switch(targetId) {
                    case 'g':
                        green.play();
                        break;
                    case 'r':
                        red.play();
                        break;
                    case 'b':
                        blue.play();
                        break;
                    case 'y':
                        yellow.play();
                        break;
                    default:
                        break;
                }

                setTimeout( function() {
                    $("#" + targetId).removeClass('illuminate');
                    counter++;
                    if ( counter === says.length ) {
                        game.compTurn();
                    }
                }, 300);
            }
        } else {
            return;
        }
    });

}

// Ready game on page load
var game = new Simon();

//Start game
$('#go').on('click', function() {
    if ( !game.isStarted() ) {
        game.setStarted();
        game.compTurn();
        $('#go').addClass('on');
    }
});

//Power turn on/off as appropriate
$('#power').on('click', game.powerButton);

//Strict mode toggle
$('#mode').on('click', game.strictToggle);

