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
const solvePop = document.querySelector('#solve-popup')
const solveInput = document.querySelector('#solve-input')
const checkBtn = document.querySelector('#check-btn')
const solveBtn = document.querySelector('#solvebtn')
const redobtn = document.querySelector('#redo-btn')
const backBtn = document.querySelector('#back-btn')
let currentWord,
  inputVal,
  Random = ''
let wordArray = []
let checkArr = []
let solveArr = []
let score = 0
let diff = 0
let wrongGuess = 0
let done = false
let correct = false
let emptyInput = false
let wrong = false
let maxGuesses = 6
let vowels = ['a', 'e', 'i', 'o', 'u']

///////////////functions////////////////////

//onload function to load things
body.onload = () => {
  randomWord()
  animateFortune()
  wrng.innerText = `${wrongGuess} / ${maxGuesses}`
  scoreValue.innerText = score
}

//function to animate the numbers in the fortune box
const animateFortune = () => {
  let currentNumber = 0
  Random = Math.floor(Math.random() * 100)
  let animationInterval = setInterval(() => {
    currentNumber = Math.floor(Math.random() * 100)
    fortune.innerText = currentNumber
    nextTurn.disabled = true
    resetBtn.diabled = true
    if (currentNumber === Random) {
      nextTurn.disabled = false
      clearInterval(animationInterval)
    }
  }, 30)
}

//function to get random words along with hint
const randomWord = async () => {
  let test1 = await axios.get('https://api.api-ninjas.com/v1/randomword', {
    headers: { 'X-Api-Key': 'FLozrBrtj7nfy0JE0CItCQ==ikziNculhRtgSryP' }
  })
  currentWord = test1.data.word
  console.log(currentWord)
  guessWord.innerHTML = currentWord
    .split('')
    .map((word) => `<li class = "letter"></li>`)
    .join('')

  try {
    let test = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
    )
    hint = test.data[0].meanings[0].definitions[0].definition
    
  } catch (error) {
    console.error('Meaning not found in API, generating new word')
    randomWord()
  }
  console.log(hint)
  document.querySelector('.hint-text b').innerText = hint
  wordArray = [...currentWord]
  console.log(wordArray)
  checkArr = []
}

//function to display the game Over message
const gameOver = () => {
  popup.style.display = 'block'
  playAgain.style.display = 'block'
  nextTurn.disabled = true
  resetBtn.disabled = true
  msg.innerText = `the correct word was ${currentWord} and Your scores are ${score}`
}

//function to take the input and check the game winner
const gamePlay = () => {
  inputVal = input.value.toLowerCase()
  console.log(inputVal)
  if (input.value.trim() === '') {
    emptyInput = true
    return
  }
  emptyInput = false
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
  vowels.forEach((vowel) => {
    if (inputVal === vowel) {
      score = score - 25 * diff
      scoreValue.style.color = 'red'
      done = true
    }
  })
  if (!done) {
    scoreValue.style.color = 'greenyellow'
  }
  done = false

  scoreValue.innerText = score
  diff = 0
  input.value = ''
  if (wrongGuess > 0) {
    wrng.style.color = 'red'
  }
  if (wrongGuess === maxGuesses) {
    return gameOver()
  }
  correct = false
  if (checkArr.length === wordArray.length) {
    randomWord()
    animateFortune()
  }
}

//function to reset the game
const reset = () => {
  checkArr = []
  input.innerText = ''
  wordArray = []
  score = 0
  wrongGuess = 0
  correct = false
  randomWord()
  animateFortune()
  scoreValue.innerText = score
  wrng.innerText = `${wrongGuess} / ${maxGuesses}`
  sco
}

//////////////Event Listners///////////////////////////

nextTurn.addEventListener('click', () => {
  if (checkArr.length != wordArray.length && checkArr.length > 0) {
    gamePlay()
    if (!emptyInput) {
      animateFortune()
    }
  } else if (checkArr.length === 0) {
    gamePlay()
    if (!emptyInput) {
      animateFortune()
    }
  }
})

playAgain.addEventListener('click', () => {
  popup.style.display = 'none'
  playAgain.style.display = 'none'
  reset()
  wrng.innerText = `${wrongGuess} / ${maxGuesses}`
  scoreValue.innerText = score
  nextTurn.disabled = false
  resetBtn.disabled = false
})

resetBtn.addEventListener('click', () => {
  reset()
})

checkBtn.addEventListener('click', () => {
  if (currentWord === solveInput.value) {
    score += Random * 50
    randomWord()
    gamePlay()
    animateFortune()
  } else {
    score = 0
    gameOver()
  }
  scoreValue.innerText = score
  solvePop.style.display = 'none'
  solveInput.value=""
})
solveBtn.addEventListener('click', () => {
  solvePop.style.display = 'block'
})

backBtn.addEventListener('click', () => {
  solvePop.style.display = 'none'
  solveInput.value=""
})
