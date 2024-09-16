import { words } from "./words.js";
const wordText = document.querySelector('.word');
const hintText = document.querySelector('.hints');
const refreshBtn = document.querySelector('.refresh-button');
const checkBtn = document.querySelector('.check-button');
const inputEl = document.querySelector('input');
const timerEl = document.querySelector('.time-left b');

let correctWord;
let timer;

function initTimer(maxTime){
    clearInterval(timer);
    timer = setInterval(()=>{
        if(maxTime > 0){
            maxTime--;
          return  timerEl.innerHTML = `${maxTime}`;
        }
        clearInterval(timer);
        alert(`Time over ${correctWord.toUpperCase()} is the correct word`);
        initGame();
    },1000)
}

function initGame(){
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split('');
    for(let i = wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] =   [wordArray[j], wordArray[i]]
    }
    wordText.innerHTML = wordArray.join('');
    hintText.innerHTML = `Hint: <span>${randomObj.hint}</span>`;
    correctWord = randomObj.word.toLowerCase();
    inputEl.value = '';
    inputEl.setAttribute('maxLength', correctWord.length);
   
}

initGame()

function checkWord () {
    let userWord = inputEl.value.toLocaleLowerCase();
    if (!userWord) return alert('Please enter a word check');
    if (userWord !== correctWord) return alert(`Oops ${userWord} is not a correct word`);
    alert(`Congrats ${userWord.toUpperCase()} is a correct word`);
    initGame()

}
refreshBtn.addEventListener('click',initGame);
checkBtn.addEventListener('click', checkWord)