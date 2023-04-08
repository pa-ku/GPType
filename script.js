const wordList = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'];

const startButton = document.getElementById('start-button');
const inputArea = document.getElementById('input-area');
const scoreSpan = document.getElementById('score');
const gameArea = document.querySelector('.game');
const message = gameArea.querySelector('p');

let currentWord = '';
let score = 0;
let timer = 10;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  message.textContent = 'Get ready...';
  setTimeout(() => {
    startGame();
  }, 2000);
});

inputArea.addEventListener('input', () => {
  if (inputArea.value.trim() === currentWord) {
    score++;
    scoreSpan.textContent = score;
    currentWord = getRandomWord();
    inputArea.value = '';
    message.textContent = currentWord;
  }
});

function startGame() {
  score = 0;
  timer = 10;
  currentWord = getRandomWord();
  scoreSpan.textContent = score;
  inputArea.value = '';
  inputArea.disabled = false;
  inputArea.focus();
  message.textContent = currentWord;
  countdown();
}

function getRandomWord() {
  const index = Math.floor(Math.random() * wordList.length);
  return wordList[index];
}

function countdown() {
  const countdownInterval = setInterval(() => {
    timer--;
    message.textContent = `${currentWord} (${timer})`;
    if (timer === 0) {
      clearInterval(countdownInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  inputArea.disabled = true;
  message.textContent = `Game over! Your score is ${score}.`;
  startButton.disabled = false;
}
