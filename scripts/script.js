////global Variables//////////////////////////
let fortune = document.querySelector('#fortune-teller')
let guessWord = document.querySelector('.word-display')
let nextTurn = document.querySelector('#next-turn')
let currentWord = ''
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
}

const winCheck = () => {}

//////////////Event Listners///////////////////////////
nextTurn.addEventListener('click', () => {
  gameFortune()
  randomWord()
})
