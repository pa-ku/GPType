
/*-------------------------
          GAME
--------------------------*/


const wordList = ['maluma', 'tonco', 'pedropepe', 'cucamonga', 'oruga', 'motopapi', 'grape','monorriel', 'chat gpt', 'cosme','cocoliso','arraw','vaporub', 'duff','moe','rosalisa','wasuwasol','bizatrap','chinchunpin','motomami','sustito','oliwi','lulu','oink','fulanito','cumbancha','miciela','mirei','almondiga','fatura','pollajeria','ñaco','chuwaka','murciegalo','sanma','peladero','chosma','completo','incompleto','trompul','tomaco','vagamundo','crocodilo','toballa','disket','ester','piscore','ipa'];

const startButton = document.getElementById('start-button');
const inputArea = document.getElementById('input-area');
const scoreSpan = document.getElementById('score');
const gameArea = document.querySelector('.game');
const message = gameArea.querySelector('.preparate');
const timerClock = gameArea.querySelector('.timer');

let currentWord = '';
let score = 0;
let timer = 40;


/*-------------------------
          SOUND 
--------------------------*/
let endSound = new Audio("hornet.wav");
let updateSound = new Audio("update.wav");
let yaySound = new Audio("yay.ogg");
let startSound = new Audio("button.wav");
let onSound = new Audio("on.wav");

const silenceSound = document.querySelector('.btn-silence')
const activeSound = document.querySelector('.btn-sound')
const muteCheckbox = document.getElementById('mute-checkbox');




muteCheckbox.addEventListener('change', () => {
  if (muteCheckbox.checked) {
    endSound.volume = 0;
    updateSound.volume = 0;
    yaySound.volume = 0;
    startSound.volume = 0;
    activeSound.style.display="none"
    silenceSound.style.display="flex"
  
 
  } else {
    endSound.volume = 1;
    updateSound.volume = 1;
    yaySound.volume = 1;
    startSound.volume = 1;
    activeSound.style.display="flex"
    silenceSound.style.display="none"
    onSound.play()
  }
});


/*-------------------------
          
--------------------------*/
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
    scoreSpan.style.animation = "none"; // elimina la animación anterior
    void scoreSpan.offsetWidth; // reinicia la animación
    scoreSpan.style.animation = "updateScore 1s"; // agrega la animación con una pausa
    inputArea.value = '';
    message.textContent = currentWord;
  }
});


function startGame() {
  score = 0;
  timer = 10;
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


let highScore2 = document.getElementById("high-score");

function updateHighScore() {
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score); 
    highScore2.style.animation = "none"; // elimina la animación anterior
    void highScore2.offsetWidth; // reinicia la animación
    highScore2.style.animation = "updateHighScore 2s"; // agrega la animación con una pausa
  }

}

window.addEventListener('load', () => {
 
  const highScore = localStorage.getItem('highScore');
  if (highScore) {
    // muestra el score mas alto en el inicio del juego
    highScore2.textContent = `High Score: ${highScore}`;
  }

});

function reloadHighscore () {

  const highScore = localStorage.getItem('highScore');
  if (highScore) {
    // muestra el score mas cuando termina el juego
    highScore2.textContent = `High Score: ${highScore}`;
  }
}


function endGame() {
  inputArea.disabled = true;
  message.textContent = `Se termino el tiempo motopapu 🤷‍♂️`;
  startButton.disabled = false;
  startButton.style.filter = "grayscale(0%)";
  startButton.innerHTML = "Restart";
  endSound.play();
  updateHighScore();
  reloadHighscore();
}


