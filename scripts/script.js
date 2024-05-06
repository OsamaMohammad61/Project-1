////global Variables//////////////////////////
let fortune = document.querySelector('#fortune-teller')
let guessWord = document.querySelector('.word-display')
let nextTurn = document.querySelector('#next-turn')
let input = document.querySelector('#input')
let scoreValue = document.querySelector('#score-value')
let resetBtn = document.querySelector('#reset-btn')
let wrng = document.querySelector('#wrong-guesses')
let popup = document.querySelector('#game-over-popup')
let msg = document.querySelector('#msg-disp')
let playAgain = document.querySelector('#playAgain')
let body = document.querySelector('body')
let currentWord,
  inputVal,
  Random = ''
let wordArray = []
let checkArr = []
let score = 0
let diff = 0
let wrongGuess = 0
let correct = false
let maxGuesses = 6

///////////////functions////////////////////
body.onload = () => {
  randomWord()
  gameFortune()
}
const gameFortune = () => {
  Random = Math.floor(Math.random() * 100)

  fortune.innerText = Random
}
const animateFortune = (finalNumber) => {
  let currentNumber = 0
  let animationInterval = setInterval(() => {
    currentNumber = Math.floor(Math.random() * 100)
    fortune.innerText = currentNumber
    nextTurn.disabled = true
    if (currentNumber === finalNumber) {
      nextTurn.disabled = false
      clearInterval(animationInterval)
    }
  }, 30)
}

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
  checkArr = []
}

const gameOver = (won) => {
  popup.style.display = 'block'
  playAgain.style.display = 'block'
  popup.style.opacity = '1'
  playAgain.style.opacity = '1'

  msg.innerText = `the correct word was ${currentWord} and Your scores are ${score}`
}

const gamePlay = () => {
  inputVal = input.value.toLowerCase()
  console.log(inputVal)
  if (input.value.trim() === '') {
    console.log('No character entered. Please enter a letter.')
    return
  }
  wordArray.forEach((word, index) => {
    if (word === inputVal) {
      correct = true

      checkArr.push(inputVal)
      guessWord.querySelectorAll('li')[index].innerText = inputVal

      input.value = ''
      diff++
    }
  })
  if (!correct) {
    wrongGuess++

    wrng.innerText = `${wrongGuess} / ${maxGuesses}`
  }
  score += Random * diff
  scoreValue.innerText = score
  Random = Math.floor(Math.random() * 100)

  diff = 0
  input.value = ''
  if (wrongGuess === maxGuesses) {
    return gameOver()
  }

  animateFortune(Random)
  correct = false
}

const reset = () => {
  checkArr = []
  input.innerText = ''
  wordArray = []
  score = 0
  wrongGuess = 0
  correct = false
  randomWord()
  gamePlay()
}

//////////////Event Listners///////////////////////////

nextTurn.addEventListener('click', () => {
  if (checkArr.length != wordArray.length && checkArr.length > 0) {
    gamePlay()
  } else if (checkArr.length === 0) {
    gamePlay()
  } else if (checkArr.length === wordArray.length) {
    console.log(checkArr.length)
    gamePlay()
    randomWord()
  }
})

playAgain.addEventListener('click', () => {
  popup.style.display = 'none'
  playAgain.style.display = 'none'
  body.style.opacity = '1'
  reset()
  randomWord()
  gamePlay()
  wrng.innerText = `${wrongGuess} / ${maxGuesses}`
  scoreValue.innerText = score
})

resetBtn.addEventListener('click', () => {
  reset()
})
