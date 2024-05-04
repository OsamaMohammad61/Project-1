////global Variables//////////////////////////
let fortune = document.querySelector('#fortune-teller')

let nextTurn= document.querySelector('#next-turn')
















///////////////functions////////////////////
const gameFortune= () =>{
    let Random  = Math.floor(Math.random()*100)
    
    fortune.innerText = Random
}

















//////////////Event Listners///////////////////////////
nextTurn.addEventListener('click', gameFortune)