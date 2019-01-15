// -----------------------------Variables---------------------------------------
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
  'wineglass'
];

// Tracks wins
var wins = 0;

// Stores letters guessed
var lettersGuessed = [];

// Tracks how many guesses are left
var guesses = 10;

// Initializes a string of placeholders for the word to be guessed
var hiddenLetters = '';

// Uses an array to store the user guesses that match a letter in secretWord
var hidden = [];

// Holds the string of the current secret word
var secretWordLetters = '';

// Holds the array of incorrect guesses for the current word
var incorrect = [];

// Holds the array of valid guesses
var validGuesses = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Tracks the state of the current game
var gamePaused = false;

//----------------------------------- Functions---------------------------------------------
// Starts or resets the game
function resetGame() {
  // Resets eligible guesses to the full alphabet
  validGuesses = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

  // Checks to see if all the words have been guessed
  if (checkChampion()) return;

  // Chooses the current word randomly from the list of available words
  var secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];
  // console.log(secretWord);

  // Removes the current word from the array of available words
  secretWords.splice(secretWords.indexOf(secretWord), 1);
  // console.log(secretWords);

  // Populates an array with the letters of the secret word
  secretWordLetters = secretWord.split('');

  // Resets the string of placeholders for the word to be guessed
  hiddenLetters = '';

  // Resets the array to store the user guesses that match a letter in secretWord
  hidden = [];

  // Resets the array of incorrect guesses
  incorrect = [];

  // Resets the remaining guesses
  guesses = 10;

  // Displays the number of letters in the current word as a string of underscores representing the number of spaces in the current word to be guessed
  for (var i = 0; i < secretWordLetters.length; i++) {
    // Creates the string of letter spaces to display for the current word
    hiddenLetters = hiddenLetters + '_ ';
    // Populates the array of hidden letters at the beginning
    hidden.push('_ ');
  }
  // Displays the number of spaces in the word
  document.getElementById('secretWord').textContent = hiddenLetters;

  // Displays the current number of incorrect guesses remaining
  document.getElementById('remaining').textContent = guesses;

  // Displays the current number of wins
  document.getElementById('wins').textContent = wins;

  // Displays the incorrect letters guessed so far
  document.getElementById('lettersGuessed').textContent = '';
  // console.log(hidden);
  // console.log(hiddenLetters);
}

// Prevents any random user key strokes from messing things up until the game has been reset
function pauseAndReset() {
  gamePaused = true;
  // Wraps the reset function in setTimeout to create a pause before the next round
  setTimeout(() => {
    resetGame();
    gamePaused = false;
  }, 2000);
}

// Returns an array of the index numbers of the userGuess in the current word
function getGuessedLetterPositions(arr, val) {
  var indexes = [];
  var i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      indexes.push(i);
    }
  }
  return indexes;
}

// Checks to see if a new game has started
function isNewGame() {
  // If "start game" text exists, clear it and start new game
  if (document.getElementById('begin').textContent != '') {
    document.getElementById('begin').textContent = '';
    resetGame();
    return true;
  }
  return false;
}

// Checks to see if all of the letters in the current word have been guessed correctly
function checkWin() {
  if (hidden.toString() === secretWordLetters.toString()) {
    wins++;
    // If the game has been won, pause gameplay and start a new game
    pauseAndReset();
  }
}

// Checks to see if all of the words have been guessed correctly
function checkChampion() {
  if (wins == 12) {
    document.getElementById('game').textContent =
      'Congratulations! You guessed them all!';
    return true;
  }
  return false;
}

// Adds the user guess to the hidden letters in the proper positions if it is correct
function correctGuess(userGuess) {
  hiddenLetters = '';
  if (hidden.toString() !== secretWordLetters.toString()) {
    for (
      var i = 0;
      i < getGuessedLetterPositions(secretWordLetters, userGuess).length;
      i++
    ) {
      hidden[
        getGuessedLetterPositions(secretWordLetters, userGuess)[i]
      ] = userGuess;
    }
    for (var i = 0; i < secretWordLetters.length; i++) {
      hiddenLetters = hiddenLetters + hidden[i];
    }
  }
  // Updates the hidden letter placeholders with the user's guesses
  document.getElementById('secretWord').textContent = hiddenLetters;
}

// Adds incorrect user guesses to the incorrect guesses area and removes that letter from the valid choices
function incorrectGuess(userGuess) {
  guesses--;
  document.getElementById('remaining').textContent = guesses;
  incorrect.push(userGuess);
  document.getElementById('lettersGuessed').textContent = incorrect;
  // Remove
  validGuesses.splice(validGuesses.indexOf(userGuess), 1);
  // console.log(validGuesses);
}

// Game Mechanics------------------------------------------------------------
document.onkeyup = function(event) {
  // Checks to see if the game is paused
  if (gamePaused) return;

  // Checks if a keypress indicates the start of a new game
  if (isNewGame()) return;

  var userGuess = event.key.toLowerCase();

  // Checks if user guess is in the secret word; reveals the guessed letter
  if (secretWordLetters.indexOf(userGuess) > -1) {
    correctGuess(userGuess);
    checkWin();

    // If not adds the letter to the previously guessed incorrect letters
  } else if (validGuesses.indexOf(userGuess) > -1) {
    // Removes that letter from the valid guesses, decrement the guesses remaining, and if zero end the game
    incorrectGuess(userGuess);
    if (guesses == 0) {
      document.getElementById('game').textContent =
        'Game Over! Refresh to try again.';
    }
  }
};
