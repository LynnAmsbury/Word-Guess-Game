// Variables------------------------------------------------------------
// Array of words to guess
var secretWords = [
    'bordeaux',
    'cabernet',
    'california',
    'chardonnay',
    'corkscrew',
    'france',
    'grapevine',
    'italy',
    'merlot',
    'syrah',
    'vintage',
    'wineglass'];
    
    // Tracks wins
    var wins = -1;
    
    // Stores letters guessed
    var lettersGuessed = [];
    
    // Tracks how many guesses are left
    var guesses = 10;
    
    // Holds the string for the display of guessed and invisible letters
    var hiddenLetters = ""
    
    // Holds the array of guessed and invisible letters
    var hidden = [];
    
    // Holds the string of the current word
    var letters = "";
    
    // Holds the array of incorrect guesses for the current word
    var incorrect = [];
    
    // Holds the array of valid guesses
    var validGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    
    // Functions------------------------------------------------------------
    // Starts or resets the game
    function resetGame() {
        validGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    
        // Checks to see if all the words have been guessed
        checkChampion();
    
        // Chooses the current word randomly from the list of available words
        var secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];  
        console.log(secretWord);
    
        // Removes the current word from the array of available words and images
        secretWords.splice(secretWords.indexOf(secretWord), 1);
        // console.log(secretWords);
    
        // Populates an array with the letters of the secret word
        letters = secretWord.split("");
    
        // Resets the string of hidden and guessed letters
        hiddenLetters = ""; 
    
        // Resets the array of hidden and guessed letters
        hidden =[];
    
        // Resets the array of incorrect guesses
        incorrect= [];
    
        // Resets the remaining guesses
        guesses = 10;
        // console.log(letters);
    
        // Displays the number of letters in the current word as a string with underscores to represent the spaces
        for (var i = 0; i < letters.length; i++) {
            // Creates the string of letter spaces to display for the current word
            hiddenLetters = hiddenLetters + "_ "; 
            // Populates the array of hidden letters at the beginning
            hidden.push("_ ");   
        }
            // Displays the number of spaces in the word
            document.getElementById("secretWord").textContent = hiddenLetters;
    
            // Displays the current number of incorrect guesses remaining
            document.getElementById("remaining").textContent = guesses;
    
            // Displays the current number of wins
            document.getElementById("wins").textContent = wins;
    
            // Displays the incorrect letters guessed so far
            document.getElementById("lettersGuessed").textContent = '';
            // console.log(hidden);
            // console.log(hiddenLetters);
            // console.log(letters);
    }
    
    // Returns an array of the index numbers of the userGuess in the current word
    function getAllIndexes(arr, val) {
        var indexes = [];
        var i;
        for( i = 0; i < arr.length; i++) {
            if (arr[i] === val){
                indexes.push(i);
            }
        }
                return indexes;
        
    }
    
    // Checks to see if all of the letters in the current word have been guessed correctly
    function checkWin() {
        if (hidden.toString() === letters.toString()){
            wins++;
            resetGame();
        }
    }
    
    // Checks to see if all of the words have been guessed correctly
    function checkChampion() {
        if (wins == 12) {
            document.getElementById("game").textContent = "Congratulations! You guessed them all!";
        }
    }
    
    // Adds the user guess to the hidden letters in the proper positions if it is correct
    function correctGuess(userGuess) {
        hiddenLetters = "";
            if (hidden.toString() !== letters.toString()){
            for (var i = 0; i < getAllIndexes(letters, userGuess).length; i++) {
            hidden[getAllIndexes(letters, userGuess)[i]] = userGuess;
            }
            for (var i = 0; i < letters.length; i++) {
                hiddenLetters = hiddenLetters + hidden[i]; 
            }
        } 
    }
    
    // Adds the user guess to the incorrect guesses and removes that letter from the valid choices
    function incorrectGuess(userGuess) {
            guesses--;
            document.getElementById("remaining").textContent = guesses;
            incorrect.push(userGuess);
            document.getElementById("lettersGuessed").textContent = incorrect;
            validGuesses.splice(validGuesses.indexOf(userGuess), 1);
            // console.log(validGuesses);
    }
    
    
    // Game Mechanics------------------------------------------------------------
    document.onkeyup = function(event) {
        document.getElementById("begin").textContent = '';
    
        // Checks to see if the player has won and increments the counter
        checkWin();
    
        // Checks to see if all the words have been guessed
        checkChampion();  
         
        var userGuess = event.key.toLowerCase();
        // If the user guess is in the word, checks to see if it has been completely guessed and if not display the correct letters where they appear in the current word
        if (letters.indexOf(userGuess) != -1) {
            correctGuess(userGuess); 
            checkWin();
            
            document.getElementById("secretWord").textContent = hiddenLetters;
            // console.log(hiddenLetters);
        // If not adds the letter to the previously guessed letters, removes that letter from the valid guesses, decrement the guesses remaining, and if zero end the game
        } else if (validGuesses.indexOf(userGuess) != -1) {
            incorrectGuess(userGuess);
            if (guesses == 0) {
            document.getElementById("game").textContent = "Game Over! Refresh to try again.";
            }
        }
        
    }
    