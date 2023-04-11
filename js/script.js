
// const background = new Image();
// background.src = "./images/bg.png";
// background.onload = function() {
//   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
// }

//Setting up the timer:
const timerContainer = document.querySelector(".timer-container");
const timer = document.getElementById("timer");
let time = 60;
let interval;
let wordHtml = document.querySelector('#word')
let wordsArray = ['one', 'two', 'three', 'mentalities']
let word
let filteredWord
const vowels = ['a', 'e', 'i', 'o', 'u']

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function() {
    startGame();

    document.addEventListener("keydown", function(event){
    console.log("word >", word,"event key >", event.key);
    })


  // Hide the start button and show the game board
  startBtn.style.display = "none";
  document.getElementById("game-board").style.visibility = "visible";
  timerContainer.style.display = "block";

  // Start the timer
  interval = setInterval(() => {
    draw();
    time--;
    timer.innerText = time;
    if (time === 0) {
      clearInterval(interval);
      // End game when time is up Win/ Lose
    }
  }, 1000);
});

function startGame() {
  findWord();
  console.log("word is ", word);
  console.log("filteredWordid", filteredWord);
}

function findWord() {
  word = wordsArray[Math.floor(Math.random() * wordsArray.length)].split('')
  filteredWord = word.map((element, i) => {
    if(i === 0 || vowels.includes(element)){
        return element
    
    }else {
      return '_'
    }
  })
}

function draw() {
  wordHtml.innerText = filteredWord.join('')
}

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value;
  console.log(guess)
  checkGuess(guess);
  guessInput.value = ""; // clear the input field
});


