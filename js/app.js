/* ============================================================
INTERFACE COMPONENTS
============================================================ */
const levelBox = document.querySelector('.header__level-selection');

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

/* ============================================================
GAME LOGIC
============================================================ */
function changeLevel() {
  level = levelBox.value;
  if (level === 'easy') {
    numberOfRows = 1;
    console.log("Level easy");
  } else if (level === 'medium') {
    numberOfRows = 2;
    console.log("Level medium");
  } else if (level === 'hard') {
    numberOfRows = 3;
    console.log("Level hard");
  }
  numberOfCircles = circlesPerLine * numberOfRows;
  console.log(numberOfCircles);
}

function renderBoard() {
  console.log('Initial board rendered');
}

function generateRandomColourValue() {
  const randomColourValue = Math.floor(Math.random() * Math.floor(256));
  return randomColourValue;
}

function generateRandomColour() {
  const red = generateRandomColourValue();
  const green = generateRandomColourValue();
  const blue = generateRandomColourValue();
  let randomColour = `rgb(${red},${green},${blue})`;
  console.log(randomColour);
  return randomColour;
}

renderBoard();
generateRandomColour();

/*
1 – Render circles as per level selected by user;
DONE     Grab level selected by user and assign to number of circles variable
·        Generate number of circles as per number of circles variable
·        Append circles to board

2 – Assign random colours to rendered circles
·        Generate random colours
·        Assign random colours to generated circles

3 – Pick winner colour from among the rendered circle colours;
·         Show in game question

4 – Check if clicked colour matches winning colour
·         Implement action if there’s a match or if there’s no match

5 – Enter functionality for exit button

6 – Enter functionality for start / reset button

7 – Enter functionality for level button
*/