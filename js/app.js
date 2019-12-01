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
const modals = document.querySelectorAll('.modal');
const modalWin = document.querySelector('.modal__win');
const modalWinButtonReset = document.querySelector('.modal__win .modal__button--reset');
const modalWinButtonExit = document.querySelector('.modal__win .modal__button--exit');
const modalIncorrect = document.querySelector('.modal__incorrect');
const modalIncorrectButtonContinue = document.querySelector('.modal__incorrect .modal__button--continue');
const modalLose = document.querySelector('.modal__lose');
const modalLoseButtonReset = document.querySelector('.modal__lose .modal__button--reset');
const modalLoseButtonExit = document.querySelector('.modal__lose .modal__button--exit');
const modalButtonContinue = document.querySelector('.modal__button--continue');

/* ============================================================
CONTROLLERS
============================================================ */
let level = levelBox.value;
const circlesPerLine = 4;
let numberOfRows = 1;
let numberOfCircles = circlesPerLine * numberOfRows;
let attempts = 3;

/* ============================================================
EVENT LISTENERS
============================================================ */
levelBox.addEventListener('change', changeLevel);
boardBox.addEventListener('click', checkWin);
resetButton.addEventListener('click', renderBoard);
exitButton.addEventListener('click', exit);
modalWinButtonReset.addEventListener('click', renderBoard);
modalWinButtonExit.addEventListener('click', exit);
modalIncorrectButtonContinue.addEventListener('click', hideModals);
modalLoseButtonReset.addEventListener('click', renderBoard);
modalLoseButtonExit.addEventListener('click', exit);

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

function hideModals() {
  modals.forEach((modal) => {
    modal.style.display = 'none';
  });
}

function renderBoard() {
  hideModals();

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

function processWin() {
  modalWin.style.display = 'flex';
}

function checkWin(e) {
  if (e.target.classList[0] === 'board__tile') {
    const clickedCircle = e.target;
    const clickedCircleColour = clickedCircle.style.backgroundColor;
    if (clickedCircleColour === questionColour.textContent) {
      processWin();
    } else {
      attempts -= 1;
      if (attempts === 1) {
        attemptsPlural.style.display = 'none';
      }
      attemptsNumber.textContent = attempts;
      clickedCircle.style.visibility = 'hidden';
      if (attempts === 0) {
        modalLose.style.display = 'flex';
      } else if (attempts > 0) {
        modalIncorrect.style.display = 'flex';
      }
    }
  }
}

function exit() {
  window.close();
}

renderBoard();