import { wordLists } from "./wordlist.js";

const keyboardEl = document.querySelector('.keyboard');
const hintEl = document.querySelector('.hint-text b');
const wordDisplay = document.querySelector('.word-display');
const guessText = document.querySelector('.guesses-text b');
const hangmanImage = document.querySelector('.hangman-box img');
const gameModal = document.querySelector('.game-modal');
const playAgainBtn = document.querySelector('.play-again');
const scoreEl = document.querySelector('.score');

let currWord,currLetter,guessWrongNum;
const maxGuess = 6;
let score =0;

function resetGame(){
    // reseting all the variable and ui element
    currLetter = [];
    guessWrongNum =0;
    guessText.innerHTML = `${guessWrongNum} / ${maxGuess}`;
    hangmanImage.src = `images/hangman-${guessWrongNum}.svg`;
    keyboardEl.querySelectorAll('button').forEach((btn) => btn.disabled = false)
    wordDisplay.innerHTML = currWord.split('').map(() => `<li class="letter"></li>`).join('');
    gameModal.classList.remove('show');
}

function getRandomWord (){
    // selecting a random hint and word from the wordlists
        const {word, hint} = wordLists[Math.floor(Math.random() * wordLists.length)]; 
        hintEl.innerHTML = hint;
        currWord = word;
        resetGame();
        console.log(word)
}


function gameOver(isVictory){
    //update the game modal popup content
    setTimeout(() => {
        const modalText = isVictory ? `You found the word` : `The correct word was:`;
        gameModal.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector('h4').innerText = `${isVictory ? 'Congrats' : 'Game over'}`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currWord}</b>`;
        if(isVictory === true) {
            score++;
            scoreEl.innerHTML = `Score: ${score}`;
        }
        gameModal.classList.add('show');
    },300)
}

function initGame(button,clickLetter) {
    // checking if clickletter is exit on the word 
   if (currWord.includes(clickLetter)){
    // showing if clickletter is exit in the currword
    [...currWord].forEach((letter,index) => {
        if (letter === clickLetter){
            currLetter.push(letter);
            wordDisplay.querySelectorAll('li')[index].innerText = letter;
            wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
        }
    });
 // if the guess number is wrong then update the hangman image
   } else{
      guessWrongNum++;
     hangmanImage.src = `images/hangman-${guessWrongNum}.svg`;
   }
   button.disabled = true;
   guessText.innerHTML = `${guessWrongNum} / ${maxGuess}`;
// calling gameOver if any of these condition is meets
   if (guessWrongNum === maxGuess)  return gameOver(false);
   if (currLetter.length === currWord.length)  return gameOver(true);
  
}


// create keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    const letter = String.fromCharCode(i);
    button.innerHTML = letter;
    button.dataset.letter = letter; // Store the letter in a data attribute for easy access
    keyboardEl.appendChild(button);
    button.addEventListener('click', () => {
        initGame(button, letter);
    });
}

// Update keydown event listener to use the button associated with the key
window.addEventListener('keydown', (event) => {
    const button = Array.from(keyboardEl.querySelectorAll('button')).find(btn => btn.dataset.letter === event.key);
    if (button && !button.disabled) { // Check if the button exists and is not disabled
        initGame(button, event.key);
    }
});


getRandomWord()
playAgainBtn.addEventListener('click', getRandomWord)
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        getRandomWord()
    }
})