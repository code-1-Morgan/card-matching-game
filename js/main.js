//select all cards from html
let cardDivs = document.querySelectorAll('div')
let sides = document.querySelectorAll('.frontSide')
//add to array
let cardsArray = Array.from(cardDivs)
//add event listener to each card
cardsArray.forEach((card) => card.addEventListener('click', flipCard))
//add event listener to each card

//randomize array, found at https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function randomizeCards(){
  cardsArray.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cardsArray.length);
    card.style.order = randomIndex;
  });
}

randomizeCards(cardsArray)

let clickedCard = []
let counter = 0

function flipCard(){
    let backSide = this.querySelector('.backSide')
    backSide.classList.add('hidden')

    let frontSide = this.querySelector('.frontSide')
    frontSide.classList.remove('hidden')

    clickedCard.push(this)

    if (clickedCard.length === 2){
        cardCheck()

    }
    winningBoard()


}

// check if cards match
function cardCheck(){
    let imageOne = getImage(clickedCard[0])
    let imageTwo = getImage(clickedCard[1])
    console.log(clickedCard)

    if(imageOne !== imageTwo){
        setTimeout(flipBack, 800, clickedCard[0], clickedCard[1])
    }
      
   clickedCard = []
   if(clickedCard.length === cardsArray.length){
    winningBoard()
}
}

function flipBack(divElementOne, divElementTwo){
    console.log('flipBack starting')
    let backSideClicked = divElementOne.querySelector('.backSide')
    backSideClicked.classList.remove('hidden')

    let frontSideClicked = divElementOne.querySelector('.frontSide')
    frontSideClicked.classList.add('hidden')
    
    let backSideTwoClicked = divElementTwo.querySelector('.backSide')
    backSideTwoClicked.classList.remove('hidden')
    
    let frontSideTwoClicked = divElementTwo.querySelector('.frontSide')
    frontSideTwoClicked.classList.add('hidden')
    console.log('flipBack ending')
}

function getImage(divElementOne){
    let frontSide = divElementOne.querySelector('.frontSide')
    return frontSide.src
}

function winningBoard() {
    console.log('winning board starting')
    //if each of the cards is face up, then
    let sidesToArray = Array.from(sides)
    console.log(sidesToArray)
  
    let sideGroup = sidesToArray.every((card) => {
      let nodeToArray = Array.from(card.classList)
      let checkClass = nodeToArray.includes('hidden')
      if (!checkClass) {
        return true
      } else {
        return false
      }
    })
  
    if (sideGroup === true) {
      document.querySelector('h2').innerText = 'You won!'
      document.querySelector('h2').classList.add('winnerText')
    } 
    console.log('winning board ending')
    return sideGroup
  }
  

//score

//reset