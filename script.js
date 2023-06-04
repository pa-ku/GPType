const wordList = ['tonco', 'pedropepe', 'cucamonga', 'oruga', 'motopapi', 'grape','monorriel', 'cosme','cocoliso','arraw','vaporub', 'duff','rosalisa','bizatrap','motomami','sustito','fulanito','cumbancha','miciela','almondiga','fatura','pollajeria','chuwaka','murciegalo','peladero','incompleto','trompul','tomaco','vagamundo','crocodilo','toballa','disket','piscore','cruasan','chowquepan','choroi','trompezon','chocobo','troncochango','piopolo','obscuro','efelante','esplanada','fregaplato','subrealista','beneficiencia','exeptico','discreccion','perjuicios','inaptitud','torticulis','imprimido','veniste','resilencia','indeleuble','vistima','pauperrimo','surrealista','vicisitud','infringir','desfenestrado','pasterizado','yoistik'];

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

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
const silenceSound = document.querySelector('.btn-silence')
const activeSound = document.querySelector('.btn-sound')
const muteCheckbox = document.getElementById('mute-checkbox');

const audioManager = new Map();
audioManager.set('startGame', new Audio("sounds/startButton.wav"));
audioManager.set('muteButton', new Audio("sounds/on.wav"));
audioManager.set('newWord', new Audio("sounds/newWord.mp3"));
audioManager.set('newScore', new Audio("sounds/newscore.wav"));
audioManager.set('resetButton', new Audio("sounds/resetButton.wav"));



muteCheckbox.addEventListener('change', () => {
  if (muteCheckbox.checked) {
    audioManager.forEach(sound => {
      sound.volume = 0;
    });
    activeSound.style.display = "none"
    silenceSound.style.display = "flex"
  } else {
    audioManager.forEach(sound => {
      sound.volume = 1;
    });
    audioManager.get('muteButton').play()
    activeSound.style.display = "flex"
    silenceSound.style.display = "none"
  }
})


startButton.addEventListener('click',() => {
  audioManager.get('startGame').play();
  startButton.disabled = true;
  startButton.style.filter = "grayscale(100%)";
  startButton.textContent  = "Playing";
  message.textContent = 'Vamo a darle...';
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



  resetButton.addEventListener('click', () =>{
    audioManager.get('resetButton').play();
    timer = 1;
  })


function startGame() {
  score = 0;
  timer = 40;
  currentWord = getRandomWord();
  scoreSpan.textContent = `Score: ${score}`;
  inputArea.value = '';
  inputArea.disabled = false;
  resetButton.style.display = 'flex';
  inputArea.focus();
  message.textContent = currentWord;
  countdown()
}

const lowerWordList = wordList.map(wordList => wordList.toLowerCase());
function getRandomWord() {

  audioManager.get('newWord').play();
  const randomIndex = Math.floor(Math.random()* lowerWordList.length)
  return lowerWordList[randomIndex];

}

 


function countdown() {
  const countdownInterval = setInterval(() => {
    timer--;
    message.textContent = `${currentWord}`;
    timerClock.textContent = `⏱${timer}`;
    if (timer <= 0) {
      clearInterval(countdownInterval);
      endGame();
    }
  }, 1000)}


const highScore2 = document.getElementById("high-score");

function updateHighScore() {
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    audioManager.get('newScore').play();
    localStorage.setItem('highScore', score); 
    highScore2.style.animation = "none"; // elimina la animación anterior
    void highScore2.offsetWidth; // reinicia la animación
    highScore2.style.animation = "updateHighScore 2s"; // agrega la animación con una pausa
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
  message.textContent = `Se termino el tiempo! 😿`;
  startButton.disabled = false;
  startButton.style.filter = "grayscale(0%)";
  startButton.textContent = "Restart";
  resetButton.style.display = 'none'
  updateHighScore();
  reloadHighscore();
};


const resetScore = document.getElementById('resetScore')

resetScore.addEventListener('click', () =>{
  localStorage.clear();
  location.reload();
})