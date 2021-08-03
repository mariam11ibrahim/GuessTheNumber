'use strict';
//html element
const checkElement = document.querySelector('.check');
const guessElement = document.querySelector('.guess');
const messageElement = document.querySelector('.message');
const numberElement = document.querySelector('.number');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.highscore');
const bodyElement = document.querySelector('body');
const againElement = document.querySelector('.again');
const playELement = document.querySelector('.play');
const mainElement = document.querySelector('main');
const modalElement = document.querySelector('.modal');
const nameElement = document.querySelector('.name');
const winnerElement = document.querySelector('.winner');


let guess;
let secretNumber = Math.floor(Math.random() * 20) + 1;
console.log(secretNumber);
let counter = 20;
let highScore = 0;
let playersData = {};

//start play
//click
playELement.addEventListener('click', start);
//pressing enter key
nameElement.addEventListener('keyup', event => {
  if (event.keyCode === 13) start();
});

//add guess and check
checkElement.addEventListener('click', addAndCheck);

guessElement.addEventListener('keyup', event => {
  if (event.keyCode === 13) addAndCheck();
});
//again
againElement.addEventListener('click', reset);

//setting
//start the game
function start() {
  mainElement.classList.remove('hidden');
  modalElement.classList.add('hidden');
  playersData[nameElement.value] = highScore;
}

//add and check
function addAndCheck() {
  guess = guessElement.value;
  let message =
    guess && guess > 0 ? checker(guess, secretNumber) : '🤨 NO Number';
  messageElement.textContent = message;
  scoreElement.textContent = counter;
}

//checker
function checker(num1, num2) {
  let result = num1 > num2 ? num1 - num2 : num2 - num1;
  // losing  case
  if (counter == 0) {
    return '👾 Game Over';
  }
  // winning case
  if (result === 0) {
    sucess();
    return '🎉 Correct';
  }
  //too far case || too close
  else {
    counter--;
    return result >= 6 ? '🏃 Too Far  ' : '🙋 Too Close  ';
  }
}
//sucess
function sucess() {
  highScore = counter > highScore ? counter : highScore;
  playersData[nameElement.value] = counter;
  winnerElement.textContent = ` (${getWinner(highScore)}  👑)`;
  console.log(highScore);
  highScoreElement.textContent = highScore;
  numberElement.textContent = secretNumber;
  bodyElement.style.backgroundColor = '#3cb371';
}
//reset
function reset() {
  //open the stat window
  modalElement.classList.remove('hidden');
  mainElement.classList.add('hidden');
  //reset the data
  secretNumber = Math.floor(Math.random() * 20) + 1;
  counter = 20;
  scoreElement.textContent = counter;
  messageElement.textContent = 'Start guessing...';
  bodyElement.style.backgroundColor = '#222';
  numberElement.textContent = '?';
  guessElement.value = '';
}
function getWinner(highScore) {
  return Object.keys(playersData).find(name => playersData[name] == highScore);
}
