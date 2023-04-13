
// const background = new Image();
// background.src = "./images/bg.png";
// background.onload = function() {
//   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
// }

//banner logo
const bannerContainer = document.getElementById("banner-container");
bannerContainer.classList.remove("hidden");

//Setting up the timer:
const timerContainer = document.querySelector(".timer-container");
const timer = document.getElementById("timer");
timerContainer.style.display = "none"; // hide timer container initially
let time = 30;
let interval;

//Array of words
let wordHtml = document.querySelector('#word')
let wordsArray = ['school', 'books', 'teacher', 'playground', 'desk', 'pencil', 'computer', 'crayon','glue','notebook']
let word
let filteredWord
let currentWordIndex = 0;
const vowels = ['a', 'e', 'i', 'o', 'u']

shuffleArray(wordsArray);

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
  
    // Hide logo once start button is clicked
    logo.style.display = "none";
  
    // Start the timer
    interval = setInterval(() => {
      draw();
      time--;
      timer.innerText = time;
      if (time === 0) {
        time = 30;
        timer.innerText = 30;
        clearInterval(interval);
        endGame();
      }
    }, 1000);
  });

function startGame() {
    time = 30;
    timer.innerText = 30;
  currentWordIndex = 0;
  findWord();
  console.log("word is ", word);
  console.log("filteredWordid", filteredWord);
}

function findWord() {
  word = wordsArray[currentWordIndex].split('')
  filteredWord = word.map((element, i) => {
    if(i === 0 || vowels.includes(element)){
      return element
    } else {
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

function checkGuess(guess) {
    console.log("Guess:", guess);
    console.log("Word:", word.join(""));
    if (guess === word.join("")) {
      clearInterval(interval);
      document.getElementById("message").innerText = "You win!";
      currentWordIndex++;
      if (currentWordIndex >= wordsArray.length) {
        endGame();
      } else {
        findWord();
        interval = setInterval(() => {
          draw();
          time--;
          timer.innerText = time;
          if (time === 0) {
            clearInterval(interval);
            document.getElementById("message").innerText = "Time's up! Game over.";
            endGame();
          }
        }, 1000);
      }
    } else {
      document.getElementById("message").innerText = "Oops, try again.";
    }
  }

function endGame() {
  clearInterval(interval);
  startBtn.style.display = "block";
  document.getElementById("game-board").style.visibility = "hidden";
  timerContainer.style.display = "none"; // hide the timer container when the game ends

  
  const body = document.querySelector('body');
    console.log(body,'body');
    body.classList.add('restart');
 const images = document.querySelectorAll('img');
    images.forEach((img)=>{
        img.style.display = 'none';
    })
 
    const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", function() {
  location.reload();
});

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}





