/* ============================================================
INTERFACE COMPONENTS
============================================================ */
const levelBox = document.querySelector('.header__level-selection');
const boardBox = document.querySelector('.board');
const questionColour = document.querySelector('.question__colour');

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
    const clickedCircleColour = e.target.style.backgroundColor;
    console.log(clickedCircleColour);

    if (clickedCircleColour === questionColour.textContent) {
      console.log('This is a win!');
    } else {
      console.log('This is not a win.');
    }
  }
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

4 – Check if clicked colour matches winning colour
·         Implement action if there’s a match or if there’s no match

5 – Enter functionality for exit button

6 – Enter functionality for start / reset button

7 – Enter functionality for level button
*/