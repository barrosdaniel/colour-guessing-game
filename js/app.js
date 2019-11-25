/* ============================================================
INTERFACE COMPONENTS
============================================================ */
const levelBox = document.querySelector('.header__level-selection');
const boardBox = document.querySelector('.board');
const questionColour = document.querySelector('.question__colour');
const resetButton = document.querySelector('.header__button--reset');
const exitButton = document.querySelector('.header__button--exit');

/* ============================================================
CONTROLLERS
============================================================ */
let level = levelBox.value;
const circlesPerLine = 3
let numberOfRows = 1
let numberOfCircles = circlesPerLine * numberOfRows;

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

  // Update game question
  const winningColour = getWinningColour();
  questionColour.textContent = winningColour;

  console.log(winningColour);
}

function checkWin(e) {
  if (e.target.classList[0] === 'board__tile') {
    const clickedCircle = e.target;
    const clickedCircleColour = clickedCircle.style.backgroundColor;

    if (clickedCircleColour === questionColour.textContent) {
      alert(`You guessed the colour correctly! Click 'OK' to play again.`);
      renderBoard();
    } else {
      alert('You guessed the colour incorrectly and lost one attempt.');
      clickedCircle.style.visibility = 'hidden';
    }
  }
}

function exit() {
  window.close();
}

renderBoard();

/*
DONE     1 – Render circles as per level selected by user;
DONE     Grab level selected by user and assign to number of circles variable
DONE     Generate number of circles as per number of circles variable
DONE     Append circles to board

DONE     2 – Assign random colours to rendered circles
DONE     Generate random colours
DONE     Assign random colours to generated circles

DONE     3 – Pick winner colour from among the rendered circle colours;
DONE     Show in game question

DONE     4 – Check if clicked colour matches winning colour
DONE     Implement alerts if there’s a match or if there’s no match
DONE     4.2 - Hide clicked circle if colour don't match

DONE     Enter functionality for exit button

6 – Enter functionality for start / reset button

DONE     Enter functionality for level button

8 - Add attempts check to game 

9 - Add modal window for the win message 

10 - Add modal window for the lose message
10.1 - Implement logic for attempts remaining
10.2 - Implement logic for no attempts game over

11 - Implement total session points
11.1 - Add points box
11.2 - Add points calculation to points window
first attempt 
*/