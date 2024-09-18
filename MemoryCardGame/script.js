const cardsEl = document.querySelectorAll('.card');

let cardOne;
let cardTwo;
let disableDesk = false;
let matchCards = 8;

function flipcard (e){ 
  let clickedCard =e.target;  // getting user click card
  
  if (clickedCard !== cardOne && !disableDesk){
    clickedCard.classList.add('flip');// adding flip class to card
    if (!cardOne){
        return cardOne = clickedCard;
    }

    disableDesk = true;
    cardTwo = clickedCard;

    let cardOneImg = cardOne.querySelector('img').src;
    let cardTwoImg = cardTwo.querySelector('img').src;

    matchCard(cardOneImg, cardTwoImg);
  }
}

function matchCard(img1,img2){

  if (img1 === img2){
    matchCards++;

    if (matchCards === 8){
       setTimeout(()=>{
        shuffledCard()
       },1000)
    }
    cardOne.removeEventListener('click', flipcard);
    cardTwo.removeEventListener('click', flipcard);
    cardOne = '';
    cardTwo = '';
    return disableDesk = false;
  }
  setTimeout(()=>{ 
   cardOne.classList.add('shake');
   cardTwo.classList.add('shake');
  },400)

  setTimeout(()=>{ 
    cardOne.classList.remove('shake','flip');
    cardTwo.classList.remove('shake','flip');
    cardOne = '';
    cardTwo = '';
    disableDesk = false;
   },1200)
}

function shuffledCard (){
  matchCards = 0;
  cardOne = '';
  cardTwo = '';
  disableDesk = false;
  let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);
  cardsEl.forEach((card,index) => { 
  card.classList.remove('flip');
  let imgTag = card.querySelector('img');
  imgTag.src = `images/img-${arr[index]}.png`
  card.addEventListener('click' , flipcard);
});
}

shuffledCard();

cardsEl.forEach(card => { // adding click event 
    card.addEventListener('click' , flipcard)
});
