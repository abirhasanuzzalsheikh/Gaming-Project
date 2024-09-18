import { paragraphArr } from "./paragraph.js";

const typingText = document.querySelector('.typing-text p');
const inputEl = document.querySelector('.input-field');
const mistakesTag =document.querySelector('.mistake span');
const timeTag = document.querySelector('.time span b');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cmp span');
const tryAgainBtn = document.querySelector('.try-again');

let charIndex = 0;
let mistakes = 0;
let timer;
let maxTime = 6;
let timeLeft = maxTime;
let isTyping = false;



function randomPara(){
    let randomInx = Math.floor(Math.random() * paragraphArr.length);
    typingText.innerHTML = '';
    paragraphArr[randomInx].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    })
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',inputEl.focus());
    typingText.addEventListener('click', inputEl.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll('span');
    let  typeChar = inputEl.value.split('')[charIndex];
   if (charIndex < characters.length - 1 && timeLeft > 0){
        if (!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }

        if (typeChar == null){
            charIndex--;

            if(characters[charIndex].classList.contains('incorrect')){
                mistakes--;
            }

            characters[charIndex].classList.remove('correct','incorrect');
        } else{
    
            if (characters[charIndex].innerText === typeChar){
                characters[charIndex].classList.add('correct');
            }else{
                mistakes++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
    
        characters.forEach(span => span.classList.remove('active'));
        characters[charIndex].classList.add('active');
        let cpm = charIndex - mistakes;
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakesTag.innerHTML = mistakes;
        wpmTag.innerHTML = wpm;
        cpmTag.innerHTML = cpm;
   }else{
    clearInterval(timer);
    inputEl.value = '';
   }
}

// function initTimer(){
//     if (timeLeft > 0){
//         timeLeft--;
//         timeTag.innerHTML = timeLeft;
//     }else{
//         clearInterval(timer);
//     }
// }

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    } else {
        clearInterval(timer);
        // Show alert with WPM, CPM, and mistakes
        let cpm = charIndex - mistakes;
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        alert(`Time's up!\nWPM: ${wpm}\nCPM: ${cpm}\nMistakes: ${mistakes}`);
    }
}



function resetGame(){
    randomPara();
    clearInterval(timer);
    inputEl.value = '';
    timeLeft = maxTime;
    charIndex=0;
    mistakes =0;
    isTyping = false;
    timeTag.innerHTML = timeLeft;
    mistakesTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    // location.reload();
}
randomPara();
inputEl.addEventListener('input',initTyping);
tryAgainBtn.addEventListener('click', resetGame);