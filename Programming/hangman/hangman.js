let selectedWord = ''; 
let mistakes = 0;
let guessed = [];
let wordStatus = null;

//alphabet Buttons for game
function generateAlphabetButtons() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let buttonsHTML = alphabet.split('').map(letter =>
        `<button
            class="btn btn-lg btn-primary m-2"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
            >
            ` + letter + `
        </button>`).join('');
    document.getElementById('letters').innerHTML = buttonsHTML;
}

//keyboard supply
document.addEventListener('keydown', function(event) {
    const keyPressed = event.key.toLowerCase();
    if (/^[a-zA-Z]$/.test(keyPressed)) {
        handleGuess(keyPressed);
    }
});


//game reset
function initializeGame() {
    const userInput = prompt("Please enter an English word for the game:");
    if (userInput && /^[a-zA-Z]+$/.test(userInput)) {
        selectedWord = userInput.toLowerCase();
        generateAlphabetButtons();
        mistakes = 0;
        guessed = [];
        wordStatus = null;
        guessedWord();
        drawHangman();
        document.getElementById('instructions').classList.remove('hidden');
    } else {
        alert("Please enter a valid English word.");
        initializeGame();
    }
}


// begining initialize
window.onload = initializeGame;

//drawing hangman
function drawHangman() {

    //canvas for hangman
    const canvas = document.getElementById('hangman_canvas');
    const context = canvas.getContext('2d');
    context.clearRect(60, 5, canvas.width, canvas.height); 
    canvas.width = 300;
    canvas.height = 300;

    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;



    if (mistakes > 0) {
        context.arc(150, 50, 20, 0, Math.PI * 2); // Head
    }

    
    if (mistakes > 1) {
        context.moveTo(150, 70); // Body
        context.lineTo(150, 150);
    }
    if (mistakes > 2) {
        context.moveTo(150, 90); // Right arm
        context.lineTo(200, 120);
    }
    if (mistakes > 3) {
        context.moveTo(150, 90); // Left arm
        context.lineTo(100, 120);
    }
     if (true) {
        context.moveTo(150, 30); //hang frame
        context.lineTo(150, 10);    
        context.moveTo(150, 10); 
        context.lineTo(220, 10);    
        context.moveTo(220, 10); 
        context.lineTo(220, 200);
    }
    
    if (mistakes > 4) {
        context.moveTo(150, 150); // Right leg
        context.lineTo(200, 200);
    }
    if (mistakes > 5) {



//without setTImout, we cannot daraw with alert
        setTimeout(function(){ endGame(false);
        }, 50);
        context.moveTo(150, 150); // Left leg
        context.lineTo(100, 200);




    
    }




    context.stroke();

}



// Dealing chosen letters
function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (selectedWord.indexOf(chosenLetter) >= 0) {
        guessedWord();
        if (wordStatus === selectedWord) {
            setTimeout(function(){ endGame(true);
            }, 50);
          

        }
    } else {
        mistakes++;
        drawHangman();
  
    }
}

//World guessing space
function guessedWord() {
    wordStatus = selectedWord.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_ ")).join('');
    document.getElementById('word').innerHTML =  wordStatus+ '<p>guess this word</p>' ;
}


// Game ending + restart
function endGame(win) {
    if (win) {
        alert('Congratulations! You won!\nGame restarts');
    } else {
        alert('Game over! The word was: ' + selectedWord +'\nGame restarts');
    }
    initializeGame();
}
