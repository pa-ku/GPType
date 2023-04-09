const wordList = ['maluma', 'tonco', 'pedropepe', 'cucamonga', 'oruga', 'motopapi', 'grape','monorriel', 'chat gpt', 'cosme','cocoliso','arraw','vaporub', 'duff','moe','rosalisa','wasuwasol','bizatrap','chinchunpin','motomami','sustito','oliwi','lulu','oink','fulanito','cumbancha','miciela','mirei','almondiga','fatura','pollajeria','ñaco','chuwaka','murciegalo','sanma','peladero','chosma','completo','incompleto','trompul','tomaco','vagamundo','crocodilo','toballa','disket','ester','piscore','ipa'];

const startButton = document.getElementById('start-button');
const inputArea = document.getElementById('input-area');
const scoreSpan = document.getElementById('score');
const gameArea = document.querySelector('.game');
const message = gameArea.querySelector('.preparate');
const timerClock = gameArea.querySelector('.timer');

let currentWord = '';
let score = 0;
let timer = 30;

let endSound = new Audio("hornet.wav");
let updateSound = new Audio("update.wav");
let yaySound = new Audio("yay.ogg");

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

let startSound = new Audio("button.wav");


function startGame() {
  score = 0;
  timer = 30;
  currentWord = getRandomWord();
  scoreSpan.textContent = "Score: " + score ;
  inputArea.value = '';
  inputArea.disabled = false;
  inputArea.focus();
  message.textContent = currentWord;
  startSound.play();
  countdown();
  
}

function getRandomWord() {
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const shuffledWords = wordList.sort(() => Math.random() - 0.5);
  const index = Math.floor(random(0, shuffledWords.length));
  updateSound.play();
  return shuffledWords[index];
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
  endSound.play();
  updateHighScore();
}



function updateHighScore() {
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
/*     yaySound.play(); */
  }
}

window.addEventListener('load', () => {
  const highScore = localStorage.getItem('highScore');
  if (highScore) {
    // muestra el score mas alto en el inicio del juego
    document.getElementById('high-score').textContent = `High Score: ${highScore}`;
  }
});