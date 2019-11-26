/* ============================================================
INTERFACE COMPONENTS
============================================================ */
const levelBox = document.querySelector('.header__level-selection');
const header = document.querySelector('.header');
const resetButton = document.querySelector('.header__button--reset');
const exitButton = document.querySelector('.header__button--exit');
const questionColour = document.querySelector('.question__colour');
const attemptsNumberPhrase = document.querySelector('.attempts');
const attemptsNumber = document.querySelector('.attempts__number');
const attemptsPlural = document.querySelector('.attempts__plural');
const boardBox = document.querySelector('.board');

/* ============================================================
CONTROLLERS
============================================================ */
let level = levelBox.value;
const circlesPerLine = 3
let numberOfRows = 1
let numberOfCircles = circlesPerLine * numberOfRows;
let attempts = 3;

/* ============================================================
EVENT LISTENERS
============================================================ */
levelBox.addEventListener('change', changeLevel);
boardBox.addEventListener('click', checkWin);
resetButton.addEventListener('click', renderBoard);
exitButton.addEventListener('click', exit);

/* ============================================================
GAME LOGIC
============================================================ */
function generateRandomColourValue() {
  const randomColourValue = Math.floor(Math.random() * Math.floor(256));
  return randomColourValue;
}

function generateRandomColour() {
  const red = generateRandomColourValue();
  const green = generateRandomColourValue();
  const blue = generateRandomColourValue();
  let randomColour = `rgb(${red},${green},${blue})`;
  return randomColour;
}

function generateCircle() {
  const circleColour = generateRandomColour();
  const circleElement = document.createElement('div');
  circleElement.classList = 'board__tile';
  circleElement.style.backgroundColor = circleColour;
  return circleElement;
}

function changeLevel() {
  level = levelBox.value;
  if (level === 'easy') {
    numberOfRows = 1;
  } else if (level === 'medium') {
    numberOfRows = 2;
  } else if (level === 'hard') {
    numberOfRows = 3;
  }
  numberOfCircles = circlesPerLine * numberOfRows;
  renderBoard();
}

function getWinningColour() {
  const winningCircleIndex = Math.floor(Math.random() * Math.floor(numberOfCircles));
  const boardTiles = document.querySelectorAll('.board__tile');
  const winningCircle = boardTiles[winningCircleIndex];
  const winningColour = winningCircle.style.backgroundColor;
  console.log(winningCircle);
  return winningColour;
}

function renderBoard() {
  // Render board circles
  boardBox.innerHTML = '';
  for (let i = 0; i < numberOfCircles; i++) {
    const newCircle = generateCircle();
    boardBox.appendChild(newCircle);
  }

  // Reset game question
  const winningColour = getWinningColour();
  questionColour.textContent = winningColour;

  // Reset attempts left
  attempts = 3;
  attemptsNumber.textContent = attempts;
  attemptsPlural.style.display = 'inline';
}

function checkWin(e) {
  if (e.target.classList[0] === 'board__tile') {
    const clickedCircle = e.target;
    const clickedCircleColour = clickedCircle.style.backgroundColor;

    if (clickedCircleColour === questionColour.textContent) {
      alert(`You guessed the colour correctly! Click 'OK' to play again.`);
      renderBoard();
    } else {
      attempts -= 1;
      if (attempts === 1) {
        attemptsPlural.style.display = 'none';
      }
      attemptsNumber.textContent = attempts;
      clickedCircle.style.visibility = 'hidden';
      if (attempts === 0) {
        alert('GAME OVER. You did not guess the correct colour.');
        renderBoard();
      } else if (attempts > 0) {
        alert('You guessed the colour incorrectly and lost one attempt.');
      }
    }
  }
}

function exit() {
  window.close();
}

renderBoard();

/*
DONE     1 – Render circles as per level selected by user;
DONE     1.1 - Grab level selected by user and assign to number of circles variable
DONE     1.2 - Generate number of circles as per number of circles variable
DONE     1.3 - Append circles to board

DONE     2 – Assign random colours to rendered circles
DONE     2.1 - Generate random colours
DONE     2.2 - Assign random colours to generated circles

DONE     3 – Pick winner colour from among the rendered circle colours;
DONE     3.1 - Show in game question

DONE     4 – Check if clicked colour matches winning colour
DONE     4.1 - Implement alerts if there’s a match or if there’s no match
DONE     4.2 - Hide clicked circle if colour don't match

DONE     5 - Enter functionality for exit button

DONE     6 - Enter functionality for start / reset button

DONE     7 - Enter functionality for level button

DONE     8 - Add attempts check to game
DONE     8.1 - Add attempts text
DONE     8.2 - Add attempts functionality
8.3 - Add functionality to update attempts text on one attempt(s)

9 - Add modal window for the win message 

10 - Add modal window for the lose message
10.1 - Implement logic for attempts remaining
10.2 - Implement logic for no attempts game over

11 - Implement total session points
11.1 - Add points box
11.2 - Add points calculation to points window
first attempt 
*/