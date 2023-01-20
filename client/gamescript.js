import { drawWord } from './arrayofwords.mjs';

let letterList = '';
let randomwordstr = '';
let blank;
let spacesaslist;
let lives = 8;
const lettersthatareguessed = [];
let hintList;
let showHint;

// A function to start drawing hangman if the letter that was guessed was wrong
function drawHangman() {
  const index = ['images/hangmandeath.jpg',
    'images/hangmanarm2.jpg',
    'images/hangmanarm1.jpg',
    'images/hangmanleg2.jpg',
    'images/hangmanleg1.jpg',
    'images/hangmanbody.jpg',
    'images/hangmanhead.jpg',
    'images/hangmanpost.jpg'];
  const elem = document.querySelector('#hangman');
  console.log('lives;', lives);
  elem.src = index[lives - 1];
  lives -= 1;
}

// // const number = 3;
// const values = [
//   'a',
//   'b',
//   'c',
//   'd',
//   'e',
// ];
// elem.src = values[number]

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
  const randomwordstraslist = randomwordstr.split(''); // convert randomwordstr into a list
  spacesaslist = blank.split(''); // convert spaces into a list
  for (let i = 0; i < randomwordstr.length; i += 1) {
    if (chosenletter === randomwordstraslist[i]) { // replacing the user's guessed letter with the '_'
      spacesaslist[i] = chosenletter;
      blank = spacesaslist.join(''); // converting spaces back to a string so that we can chnage the text content
      const change = document.querySelector('#space');
      change.textContent = blank; // changing the text content of the space in order to show thw word displayed
    }
  }
}

// A function to remove letters SOME letters that are not part of the word to be guessed (as a form of a hint...) the concept is to divide, the letters that are not part of the word to be guessed, by 2 so
function addHint() {
  const hintSelector = document.querySelector('#hint');
  hintSelector.style.display = 'none';
  hintList = [];
  for (const f of letterList) {
    // console.log('randomwordstr: ', randomwordstr, 'hintList: ', hintList, 'f: ', f);
    if (!(randomwordstr.includes(f))) {
      hintList.push(f);
    }
  }


  let hintListIndex;
  showHint = [];
  const hintLetters = document.querySelectorAll('.letters');
  for (let r = 0; r < hintList.length / 2; r++) { //
    hintListIndex = Math.floor((Math.random()) * hintList.length);
    console.log('letter', hintList[hintListIndex]);
    if (!(showHint.includes(hintList[hintListIndex]))) {
      showHint.push(hintList[hintListIndex]);
    }
  } for (const letter of hintLetters) {
    if (showHint.includes(letter.textContent)) {
      console.log(letter);
      letter.style.pointerEvents = 'none';
      letter.style.background = '#4d4d4d';
      letter.style.color = 'black';
    }
  }
}

// A function to either reveal a letter from the hidden word or to remove a life from the user
function checking(chosenletter) {
  if (lettersthatareguessed.includes(chosenletter)) {
    console.log('Sorry this letter has already been guessed!');
  } else {
    lettersthatareguessed.push(chosenletter);
    if (isLetterInWord(chosenletter)) {
      console.log('letter has been found');
      reveal(chosenletter);
      if (blank === randomwordstr) {
        const displayLives = document.querySelector('#displayLives');
        const finished = document.querySelector('#lastMsg');
        const main = document.querySelector('#main');
        const restart = document.querySelector('#replay');
        displayLives.textContent = '';
        finished.style.whiteSpace = 'pre-line';
        finished.textContent = ('WELL DONE \n YOU GUESSED THE WORD!\n The word was ' + randomwordstr);
        finished.style.color = 'rgb(69, 176, 69)';
        main.style.pointerEvents = 'none';
        restart.style.display = 'block';
      }
    } else {
      console.log(chosenletter, ' is not found in the word');
      drawHangman();
      if (lives === 1) {
        const displayLives = document.querySelector('#displayLives');
        displayLives.style.color = 'red';
        displayLives.textContent = '';
      } else if (lives === 0) {
        console.log('The number of lives are:');
        const finished = document.querySelector('#lastMsg');
        const main = document.querySelector('#main');
        const restart = document.querySelector('#replay');
        console.log('here its ............', lives);
        console.log('Sorry But you ran out of lives');
        finished.style.whiteSpace = 'pre-line';
        finished.textContent = ('Sorry, you ran out of lives \n The word was ' + randomwordstr);
        finished.style.color = 'rgb(212, 52, 52)';
        main.style.pointerEvents = 'none';
        restart.style.display = 'block';
      }
      console.log('AFTER HANGMAN IS DRAWN; ', lives);
      const wrongletters = document.querySelectorAll('.letters');
      for (const wrongletter of wrongletters) {
        if (wrongletter.textContent === chosenletter) {
          wrongletter.style.borderColor = 'red';
        }
      } if (lives === 5) {
        const hangmanimg = document.querySelector('#hangman');
        const hint = document.querySelector('#hint');
        hint.style.margin = '0 0 0 50em';
        hangmanimg.style.margin = '0 0 0 43em';
        hint.style.display = 'block';
        hangmanimg.style.display = 'block';
        hint.addEventListener('click', addHint);
      }
      showLives();
    }
  }
}

function letterchecker(e) {
  if (blank === randomwordstr) {
    console.log('Sorry Word has already been guessed');
  } else {
    if (lives > 0) {
      e.target.classList.add('activeclick');
      checking(e.target.textContent);
    } else {
      console.log('Sorry. You have exhausted all of your tries!');
    }
  }
}

// A function to generate the alphabet series in uppercase in a for loop:-
function createAlphabets() {
  letterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const key = document.querySelector('#alphabets');
  for (const i of letterList) {
    const letterButton = document.createElement('button'); // Create a button for the letter
    letterButton.textContent = i; // Changes the button's textContent
    letterButton.classList.add('letters'); // Adds a class for the letter
    letterButton.addEventListener('click', letterchecker);
    key.append(letterButton); // Adds
  }
}

// A function to create blank spaces for the word to be revealed in:-
function createBlankSpaces() {
  blank = '_'.repeat(randomwordstr.length);
  const space = document.querySelector('#space');
  space.textContent = blank;
  console.log(randomwordstr, blank);
}

// A function to select a random word from the genres array:-

function importDrawWord() {
  const genres = ['Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Thriller'];

  const randomno = Math.floor((Math.random()) * genres.length); // gives An index
  randomwordstr = (genres[randomno]).toUpperCase();
}

function showLives() {
  const displayLives = document.querySelector('#displayLives');
  displayLives.textContent = ('Number of Lives = ' + lives);
}
// A function to check whether the page has been fully loaded or not
function init() {
  console.log('The page has been fully loaded');
  showLives();
  importDrawWord();
  createBlankSpaces();
  createAlphabets();
}
window.addEventListener('load', init);
