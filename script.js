const wordList = [ 'HTML','CSS','JavaScript','React','Angular','Vue','Node.js','Express','MongoDB','SQL','API','AJAX','DOM','Backend','Frontend','Framework','Git','GitHub','Responsive','SEO','Hosting','UI','UX','SASS','LESS','Webpack','Babel','REST','JSON','OAuth','CMS','Plugin','Debugging','Testing','Deployment','DevOps','Agile','Scrum','Database','SSL','Session','Cookie','Authentication','Authorization','Encryption','Performance','Cache','Router','Middleware','Component','Event','Callback','Promise','Async','Sync','Variable','Constant','Loop','Conditional','Function','Method','Class','Interface','Module','Package','Dependency','Error','Exception','Logging','Security','Cross-browser','Responsive','Mobile-first','Viewport','Pixel','API','Endpoint','HTTP','HTTPS','Request','Response','Status','Header','Body','GET','POST','PUT','DELETE','Patch','Validation','CRUD','Session','Token','Authentication','Authorization','Encryption','Hashing','Next.js','Styled Components','Single Page Application','Server-side Rendering','Static Site Generation','Virtual DOM','State Management','React Hooks','React Router','Context API','Redux','Redux Saga','React Native','CSS Grid','CSS Flexbox','Responsive Design','Media Queries','CSS Transitions','CSS Animations','CSS Preprocessors','CSS Architecture','HTML5','Semantic HTML','Web Accessibility','Progressive Web Apps','Web Performance','Code Splitting','Webpack Configuration','Unit Testing','Integration Testing','EndtoEnd Testing','Linting','Code Review','Version Control','Responsive Images','Browser Compatibility','Error Handling','User Authentication','User Authorization','Session Management','Web Security','Crosssite Scripting','Cross-site Request Forgery','Content Management System','Headless CMS','Search Engine Optimization','Google Analytics','User Experience Design','User Interface Design','Wireframing','Prototyping','Mobile-First Design','User Research','Information Architecture','Conversion Rate Optimization','Responsive Typography','Page Load Speed','Website'];


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
  message.textContent = 'Preparate a escribir!';
  setTimeout(() => {
    startGame();
  }, 2000);
})



inputArea.addEventListener('input',() => {
  if (inputArea.value.toLowerCase() === currentWord) {
    let wordLength = currentWord.length
    score+= wordLength;
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
  scoreSpan.textContent = `Score: ${score} `;
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