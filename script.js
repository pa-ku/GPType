
/*-------------------------
          GAME
--------------------------*/
const wordList = ['maluma', 'tonco', 'pedropepe', 'cucamonga', 'oruga', 'motopapi', 'grape','monorriel', 'chat gpt', 'cosme','cocoliso','arraw','vaporub', 'duff','rosalisa','bizatrap','motomami','sustito','fulanito','cumbancha','miciela','almondiga','fatura','pollajeria','chuwaka','murciegalo','peladero','completo','incompleto','trompul','tomaco','vagamundo','crocodilo','toballa','disket','piscore','cruasan','chowquepan','choroi','trompezon','chocobo','troncochango','piopolo','obscuro','efelante','esplanada','fregaplato','subrealista','beneficiencia','exeptico','discreccion','perjuicios','inaptitud','torticulis','imprimido','veniste','resilencia','indeleuble','vistima','pauperrimo','surrealista','vicisitud','infringir','desfenestrado','pasterizado','yoistik'];

const startButton = document.getElementById('start-button');

const inputArea = document.getElementById('input-area');
const scoreSpan = document.getElementById('score');
const timerClock = document.querySelector('.timer');
const gameArea = document.querySelector('.game');
const message = document.querySelector('.preparate');


let currentWord = '';
let score = 0;
let timer = 40;

/*-------------------------
          SOUND MANAGER
--------------------------*/

const startSound = new Audio("sounds/startButton.wav");
const soundoffon = new Audio("sounds/soundChange.mp3");
const newwordSound = new Audio("sounds/bip.mp3");
const newScore = new Audio("sounds/newscore.wav");
const yaySound = new Audio("sounds/yay.ogg");
const endSound = new Audio("sounds/hornet.wav");

newScore.volume = 0.5;
startSound.volume = 0.5;
soundoffon.volume = 0.5;

const silenceSound = document.querySelector('.btn-silence')
const activeSound = document.querySelector('.btn-sound')
const muteCheckbox = document.getElementById('mute-checkbox');

muteCheckbox.addEventListener('change', () => {
  if (muteCheckbox.checked) {
    endSound.volume = 0;
    newwordSound.volume = 0;
    yaySound.volume = 0;
    startSound.volume = 0;
    newScore.volume = 0;
    activeSound.style.display="none"
    silenceSound.style.display="flex"
  } else {
    endSound.volume = 1;
    newwordSound.volume = 1;
    yaySound.volume = 1;
    startSound.volume = 1;
    newScore.volume = 1;
    activeSound.style.display="flex"
    silenceSound.style.display="none"
    soundoffon.play()
  }})

/* END SOUNDS */

startButton.addEventListener('click',() => {
  startButton.disabled = true;
  startButton.style.filter = "grayscale(100%)";
  startButton.textContent  = "Playing";
  message.textContent = 'Vamo a darle...';
  startSound.play();
  setTimeout(() => {
    startGame();
  }, 2000);
})


inputArea.addEventListener('input',() => {
  if (inputArea.value.toLowerCase() === currentWord) {
    score++;
    scoreSpan.textContent = `Score: ${score}`;
    currentWord = getRandomWord();
    inputArea.value = '';
    message.textContent = currentWord;
  }})



function startGame() {
  score = 0;
  timer = 40;
  currentWord = getRandomWord();
  scoreSpan.textContent = `Score: ${score}`;
  inputArea.value = '';
  inputArea.disabled = false;
  inputArea.focus();
  message.textContent = currentWord;
  countdown()
}

const lowercaseWords = wordList.map(wordList => wordList.toLowerCase());//transforma las palabras en minuscula

function getRandomWord() {
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const shuffledWords = lowercaseWords.sort(() => Math.random());
  const index = Math.floor(random(0, shuffledWords.length));
  newwordSound.play();
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
  }, 1000)}


let highScore2 = document.getElementById("high-score");

function updateHighScore() {
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score); 
    highScore2.style.animation = "none"; // elimina la animación anterior
    void highScore2.offsetWidth; // reinicia la animación
    highScore2.style.animation = "updateHighScore 2s"; // agrega la animación con una pausa
    newScore.play()
  }}

window.addEventListener('load', () => {
  const highScore = localStorage.getItem('highScore');
  if (highScore !== null) {
    // muestra el score mas alto en el inicio del juego
    highScore2.textContent = `High Score: ${highScore}`;
  }})

function reloadHighscore () {
  const highScore = localStorage.getItem('highScore');
  if (highScore !== null) {
    // muestra el score mas cuando termina el juego
    highScore2.textContent = `High Score: ${highScore}`;
  }}

function endGame() {
  inputArea.disabled = true;
  message.textContent = `Se termino el tiempo!`;
  startButton.disabled = false;
  startButton.style.filter = "grayscale(0%)";
  startButton.textContent = "Restart";
  endSound.play();
  updateHighScore();
  reloadHighscore();
}


