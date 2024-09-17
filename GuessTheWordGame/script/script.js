import { wordList } from "./words.js";

const inputEls = document.querySelector('.inputs');
const resetBtn = document.querySelector('.reset-btn');
const hintEl = document.querySelector('.hint b');
const typingInput = document.querySelector('.typing-input');
const wrongLetterEl = document.querySelector('.wrong-letter span');
const guessLeft =  document.querySelector('.guess-left span');

let word;
let wrongLetter = [];
let correctLetter = [];
let maxGuesses;

function randomWord (){
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomObj.word;
    maxGuesses = 8;
    wrongLetter = [];
    correctLetter = [];
    console.log(randomObj)

    let html = '';
    for(let i = 0; i < word.length; i++){
        html+= `  <input type="text" disabled>`;
    }
    
    guessLeft.innerHTML = maxGuesses;
    inputEls.innerHTML = html;
    hintEl.innerHTML = randomObj.hint;
    wrongLetterEl.innerHTML = wrongLetter;

}

randomWord();
function initGame(e){
    let key = e.target.value.toLowerCase();  // Ensure the key is in lowercase
    if (key.match(/^[a-z]+$/) && !wrongLetter.includes(` ${key}`) && !correctLetter.includes(` ${key}`)){  // Check for single alphabet characters
        if(word.includes(key)){
            for(let i = 0; i < word.length; i++){
                if (word[i] === key){
                    correctLetter.push(key)
                    inputEls.querySelectorAll('input')[i].value = key;
                }
            }
        } else {
            // ** Marked Change: Only add the letter if it is not already in the wrongLetter array**
            if (!wrongLetter.includes(key)) {
                maxGuesses--;
                wrongLetter.push(` ${key}`);
            }
            guessLeft.innerHTML = maxGuesses;
            wrongLetterEl.innerHTML = wrongLetter;  // ** Marked Change: Join the array into a string for display**
        }
    } 
    typingInput.value = '';  // Clear the input field

   setTimeout(() => {  
    if (correctLetter.length === word.length){
        alert(`Congrats! You found the Word ${word.toUpperCase()}`);
        randomWord();

    } else if (maxGuesses < 1){
        alert("Game over! You don't have remaining guesses");
        for(let i = 0; i < word.length; i++){
                inputEls.querySelectorAll('input')[i].value = word[i];
        }

    }
   })   
}

resetBtn.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame)
inputEls.addEventListener('click', () => typingInput.focus());
document.addEventListener('keydown', () => typingInput.focus());
