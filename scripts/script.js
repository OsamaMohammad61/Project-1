////global Variables//////////////////////////
let fortune = document.querySelector('#fortune-teller')
let guessWord = document.querySelector('.word-display')
let nextTurn = document.querySelector('#next-turn')
let input = document.querySelector('#input')
let nxtwrdBtn = document.querySelector('#nextWord')
let checkBtn = document.querySelector('#check')
let currentWord = ''
let inputVal = ''
let wordArray = []
let checkArr = []

///////////////functions////////////////////
const gameFortune = () => {
  let Random = Math.floor(Math.random() * 100)

  fortune.innerText = Random
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
  inputVal = input.value.toLowerCase()
  console.log(inputVal)
}

const winCheck = () => {
  wordArray = [...currentWord]
  console.log(wordArray)
  inputVal = input.value.toLowerCase()
  console.log(inputVal)
  wordArray.forEach((word, index) => {
    if (word === inputVal) {
      console.log('happy')
      checkArr.push(inputVal)
      guessWord.querySelectorAll('li')[index].innerText = inputVal
    }
  })
}

//////////////Event Listners///////////////////////////
nextTurn.addEventListener('click', () => {
  gameFortune()
  randomWord()
})
nxtwrdBtn.addEventListener('click', () => {
  randomWord()
})

checkBtn.addEventListener('click', () => {
  winCheck()
})
gameFortune()
