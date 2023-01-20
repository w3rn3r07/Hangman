import { randomwordstr, drawWord } from './arrayofwords.mjs';

let alphabetList = '';
let blank;
let spacesaslist;
let lives = 8;
const lettersthatareguessed = [];
const hintList = [];
let hintListIndex;
const showHint = [];

// A function to start drawing hangman if the letter that was guessed was wrong
function drawHangman() {
  const index = ['images/hangmandeath.jpg',
    'images/hangmanarm2.jpg',
    'images/hangmanarm1.jpg',
    'images/hangmanleg2.jpg',
    'images/hangmanleg1.jpg',
    'images/hangmanbody.jpg',
    'images/hangmanhead.jpg',
    'images/hangmanpost.jpg']; // Array of hangman stages
  const elem = document.querySelector('#hangman');
  elem.src = index[lives - 1];
  lives -= 1;
}

// A function to check whether the selected letter is in the word
function isLetterInWord(chosenletter) {
  const word = randomwordstr.split('');
  for (const i of word) {
    if (i === chosenletter) {
      return true;
    }
  }
  return false;
}

// A function to reveal the letter of the word which was guessed correctly
function reveal(chosenletter) {
  const randomwordstraslist = randomwordstr.split('');
  spacesaslist = blank.split('');
  for (let i = 0; i < randomwordstr.length; i += 1) {
    if (chosenletter === randomwordstraslist[i]) {
      spacesaslist[i] = chosenletter; // replacing the user's guessed letter with the '_'
      blank = spacesaslist.join(''); // converting spaces back to a string so that we can chnage the text content
      const change = document.querySelector('#space');
      change.textContent = blank; // changing the text content of the space in order to show thw word displayed
    }
  }
}

// A function to remove letters SOME letters that are not part of the word to be guessed (as a form of a hint...) the concept is to divide, the number of letters that are not part of the word to be guessed, by 2 to make the game easier
function addHint() {
  const hintSelector = document.querySelector('#hint');
  hintSelector.style.display = 'none';
  for (const hintLetter of alphabetList) {
    if (!(randomwordstr.includes(hintLetter))) { // checks the letters of alphabet that are not part of the hidden word
      hintList.push(hintLetter); // appends the letters into list, hintList
    }
  }
  const lettersSelector = document.querySelectorAll('.letters');
  for (let r = 0; r < hintList.length / 2; r++) { // creates a list (showHint) to store half of the letters in hintList
    hintListIndex = Math.floor((Math.random()) * hintList.length); // creates a random index inorder to select random letters
    if (!(showHint.includes(hintList[hintListIndex]))) {
      showHint.push(hintList[hintListIndex]); // appends half of the letters that are part of hintList to showHint
    }
  } for (const letter of lettersSelector) {
    if (showHint.includes(letter.textContent)) { // changes colour of the letter buttons so that the user can see the letters that are not part of the hidden word
      letter.disabled = true;
      letter.style.background = '#4d4d4d';
      letter.style.color = 'black';
    }
  }
}

// A function to either reveal a letter from the hidden word, to remove a life from the user,
function checking(chosenletter) {
  lettersthatareguessed.push(chosenletter);
  if (isLetterInWord(chosenletter)) { // checks if the selected letter is part of the hidden word or not
    console.log('letter has been found');
    reveal(chosenletter); // selected letter goes to the reveal function that reveals the part of the hidden word
    if (blank === randomwordstr) { // checks if all the letters of the hidden word are guessed and displays the winning message
      const displayLives = document.querySelector('#displayLives');
      const lastMsg = document.querySelector('#lastMsg');
      const main = document.querySelector('#alphabets');
      const hint = document.querySelector('#hint');
      const restart = document.querySelector('#replay');
      displayLives.textContent = '';
      lastMsg.textContent = ('WELL DONE \n You guessed the word with \n' + lives + ' lives to spare!');
      hint.style.display = 'none';
      lastMsg.style.display = 'block'; // reveals winning message
      restart.style.display = 'block'; // reveals restart button incase user wants to play again

      main.style.pointerEvents = 'none'; // disables pointer events of letters, hint, etc so that the user does not continue the game once finished
    }
  } else { // if letter is not found in the word, stages of hangman are drawn
    console.log(chosenletter, ' is not found in the word');
    drawHangman();
    if (lives === 1) { // A warning when the user has 1 live remaining that changes the color of the lives
      const displayLives = document.querySelector('#displayLives');
      displayLives.style.color = 'red';
      displayLives.textContent = '';
    } else if (lives === 0) { // checks if lives=0 are therefore displays the losing message
      const lastMsg = document.querySelector('#lastMsg');
      const main = document.querySelector('#main');
      const restart = document.querySelector('#replay');
      const hint = document.querySelector('#hint');
      lastMsg.textContent = ('Sorry, you ran out of lives \n The word was ' + randomwordstr);
      lastMsg.style.color = 'rgb(212, 52, 52)'; // changes colour of losing message
      lastMsg.style.background = 'rgb(35 20 20)'; // changes background of losing message
      lastMsg.style.display = 'block'; // reveals losing message
      restart.style.display = 'block'; // reveals restart button
      hint.style.display = 'none';
      main.style.pointerEvents = 'none'; // disables pointer events
    }
    const wrongletters = document.querySelectorAll('.letters.activeclick');
    for (const wrongletter of wrongletters) { // A loop to change the colour of the letters that were guessed wrong
      if (wrongletter.textContent === chosenletter) {
        wrongletter.style.borderColor = 'red';
      }
    } if (lives === 4) { // A hint button that appears when user is struggling to guess the letters of the word
      const hangmanimg = document.querySelector('#hangman');
      const hint = document.querySelector('#hint');
      hint.style.margin = '0 0 0 50em';
      hangmanimg.style.margin = 'auto';
      hint.style.display = 'block';
      hangmanimg.style.display = 'block';
      hint.addEventListener('click', addHint); // An event listener to detect if the button has been pressed, user can also continue without it
    }
    showLives(); // updates lives everytime a letter is clicked
  }
}

// A event function that handles click
function letterchecker(e) {
  if (lives > 0) {
    e.target.classList.add('activeclick');
    e.target.style.pointerEvents = 'none';
    checking(e.target.textContent);
  }
}

// A function to generate the alphabet series in uppercase in a for loop:-
function createAlphabets() {
  alphabetList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');// a list of letters of the alphabet
  const key = document.querySelector('#alphabets');
  for (const i of alphabetList) {
    const letterButton = document.createElement('button'); // Create a button for the letter
    letterButton.textContent = i; // Changes the button's textContent to the letter
    letterButton.classList.add('letters'); // Adds a class for the letter
    letterButton.addEventListener('click', letterchecker);
    key.append(letterButton); // Adds the button to the div
  }
}

// A function to create blank spaces for the word to be revealed in:-
function createUnderscores() {
  blank = '_'.repeat(randomwordstr.length);// creates blank underscores with respect to the length of the random word that was selected
  const space = document.querySelector('#space');
  space.textContent = blank;// changes the textcontent to display the underscores
}

// A function to display the number of lives available to the user
function showLives() {
  const displayLives = document.querySelector('#displayLives');
  displayLives.textContent = ('Number of Lives = ' + lives);
}
// A function to check whether the page has been fully loaded or not
function init() {
  console.log('The page has been fully loaded');
  showLives();
  drawWord();
  createUnderscores();
  createAlphabets();
}
window.addEventListener('load', init);
