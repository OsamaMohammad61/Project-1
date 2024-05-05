////global Variables//////////////////////////
let fortune = document.querySelector('#fortune-teller')
let guessWord = document.querySelector('.word-display')
let nextTurn = document.querySelector('#next-turn')
let input = document.querySelector('#input')
let scoreValue = document.querySelector('#score-value')
let resetBtn = document.querySelector('#reset-btn')
let wrng = document.querySelector('#wrong-guesses')
let currentWord,
  inputVal,
  Random,
  timer = ''
let wordArray = []
let checkArr = []
let score = 0
let diff = 0
let time = 20
let wrongguess = 0
let correct = false

///////////////functions////////////////////

const gameFortune = () => {
  Random = Math.floor(Math.random() * 100)

  fortune.innerText = Random
}
const animateFortune = (finalNumber) => {
  let currentNumber = 0;
  let animationInterval = setInterval(() => {
    currentNumber = Math.floor(Math.random() * 100); // Range of numbers
    fortune.innerText = currentNumber;
    if (currentNumber === finalNumber) {
      clearInterval(animationInterval);
    }
  }, 50); 
};

const randomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
  currentWord = word
  guessWord.innerHTML = currentWord
    .split('')
    .map((word) => `<li class = "letter"></li>`)
    .join('')
  document.querySelector('.hint-text b').innerText = hint
  wordArray = [...currentWord]
  console.log(wordArray)
}

const gamePlay = () => {
  if (input.value.trim() === '') {
    console.log('No character entered. Please enter a letter.')
    return
  }
  inputVal = input.value.toLowerCase()
  console.log(inputVal)

  wordArray.forEach((word, index) => {
    if (word === inputVal) {
      correct = true
      console.log('happy')
      checkArr.push(inputVal)
      guessWord.querySelectorAll('li')[index].innerText = inputVal

      input.value = ''
      diff++
    }
  })
  if (!correct) {
    wrongguess++

    wrng.innerText = wrongguess
  }
  ///Insert a game over function

  score += Random * diff
  scoreValue.innerText = score
  Random = Math.floor(Math.random() * 100)

  animateFortune(Random)
  diff = 0
}

const reset = () => {
  checkArr = []
  input.innerText = ''
  wordArray = []
  score = 0
}

//////////////Event Listners///////////////////////////
nextTurn.addEventListener('click', () => {
  if (checkArr.length != wordArray.length && checkArr.length > 0) {
    gamePlay()
  } else if (checkArr.length === 0) {
    gamePlay()
  } else {
    randomWord()
    reset()
    gameFortune()
  }
})

randomWord()
gameFortune()
