const wordList = ['maluma', 'tonco', 'pedropepe', 'cucamonga', 'oruga', 'fig', 'grape','monorriel', 'vamo chat gpt', 'dejame un like', 'suscribite',  'cocoliso',
'churumbel',
'marmota',
'patatus',
'pachanga',
'chiquitin',
'paripe',
'chorizo',
'patán',
'pijama',
'panchito',
'piltrafilla',
'pitufo',
'papafrita',
'chiquilicuatre',
'cachondo',
'cacahuete',
'petimetre',
'pendejada',
'chorrada'];

const startButton = document.getElementById('start-button');
const inputArea = document.getElementById('input-area');
const scoreSpan = document.getElementById('score');
const gameArea = document.querySelector('.game');
const message = gameArea.querySelector('p');

let currentWord = '';
let score = 0;
let timer = 30;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  message.textContent = 'Vamo a darle...';
  setTimeout(() => {
    startGame();
  }, 2000);
});

inputArea.addEventListener('input', () => {
  if (inputArea.value.trim() === currentWord) {
    score++;
    scoreSpan.textContent = "Score: " + score;
    currentWord = getRandomWord();
    inputArea.value = '';
    message.textContent = currentWord;
  }
});

function startGame() {
  score = 0;
  timer = 30;
  currentWord = getRandomWord();
  scoreSpan.textContent = "Score: " + score;
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
  message.textContent = `Perdiste motopapu 🤷‍♂️🤷‍♀️, tenes un ${score}, vuelva prontos`;
  startButton.disabled = false;
}
