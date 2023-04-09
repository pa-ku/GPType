const wordList = ['maluma', 'tonco', 'pedropepe', 'cucamonga', 'Oruga', 'Motopapi', 'Grape','monorriel', 'chat gpt', 'Cosme','cocoliso','arraw','vaporub', 'duff','Moe','rosalisa','wasuwasol','bizatrap','chinchunpin','motomami','sustito','oliwi','lulu','oink','fulanito','cumbancha','miciela','mirei','almondiga','fatura','pollajeria','ñaco','chuwaka','murciegalo','sanma','peladero','chosma','iompleto','incompleto','trompul','tomaco','vagamundo','crocodilo','toballa','disket','ester','piscore','ipa'];

const startButton = document.getElementById('start-button');
const inputArea = document.getElementById('input-area');
const scoreSpan = document.getElementById('score');
const gameArea = document.querySelector('.game');
const message = gameArea.querySelector('.preparate');
const timerClock = gameArea.querySelector('.timer');

let currentWord = '';
let score = 0;
let timer = 30;



startButton.addEventListener('click', () => {
  startButton.disabled = true;
  startButton.style.filter = "grayscale(100%)";
  startButton.innerHTML = "Playing";
  message.textContent = 'Vamo a darle...';
  setTimeout(() => {
    startGame();
  }, 2000);
});

inputArea.addEventListener('input', () => {
  if (inputArea.value.toLowerCase() === currentWord) {
    score++;
    scoreSpan.textContent = "Score: " + score ;
    currentWord = getRandomWord();
    inputArea.value = '';
    message.textContent = currentWord;
  }
});

function startGame() {
  score = 0;
  timer = 30;
  currentWord = getRandomWord();
  scoreSpan.textContent = "Score: " + score ;
  inputArea.value = '';
  inputArea.disabled = false;
  inputArea.focus();
  message.textContent = currentWord;
  countdown();
}

function getRandomWord() {
 const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const index = Math.floor(random(0, wordList.length));
 /*  const index = Math.floor(Math.random() * wordList.length); */
  return wordList[index];
}


function countdown() {

  const countdownInterval = setInterval(() => {
    timer--;
    message.textContent = `${currentWord}`;
    timerClock.textContent = `⏱${timer}`;
    if (timer === 0) {
      clearInterval(countdownInterval);
      endGame();
    }
  }, 1000);
}


function endGame() {
  inputArea.disabled = true;
  message.textContent = `Se termino el tiempo motopapu 🤷‍♂️`;
  startButton.disabled = false;
  startButton.style.filter = "grayscale(0%)";
  startButton.innerHTML = "Restart";
  updateHighScore();
}

function updateHighScore() {
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
  }
}

window.addEventListener('load', () => {
  const highScore = localStorage.getItem('highScore');
  if (highScore) {
    // muestra el score mas alto en el inicio del juego
    document.getElementById('high-score').textContent = `High Score: ${highScore}`;
  }
});