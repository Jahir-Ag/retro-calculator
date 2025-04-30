let randomNumber;
let attempts;
let monsterAttackTurn;
let monsterImages = ['monstruo1.png', 'monstruo2.png', 'monstruo3.png'];
let currentMonster;
let gameOver = false;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const jugador = document.getElementById('jugador');
const monstruo = document.getElementById('monstruo');

function initGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  monsterAttackTurn = Math.floor(Math.random() * 8) + 8;
  currentMonster = monsterImages[Math.floor(Math.random() * monsterImages.length)];
  monstruo.src = `assets/${currentMonster}`;
  monstruo.style.left = '0%';
  message.textContent = '';
  attemptsDisplay.textContent = 'Intentos: 0';
  guessButton.disabled = false;
  guessInput.disabled = false;
  restartButton.style.display = 'none';
  gameOver = false;
}

guessButton.addEventListener('click', () => {
  if (gameOver) return;

  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = 'Ingresa un número válido entre 1 y 100.';
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `Intentos: ${attempts}`;

  // Mover monstruo hacia el jugador
  let monsterProgress = Math.min((attempts / monsterAttackTurn) * 100, 100);
  monstruo.style.left = `${monsterProgress}%`;

  if (guess === randomNumber) {
    message.textContent = '¡Correcto! Has adivinado el número.';
    alert('Uff te has salvado');
    endGame(true);
  } else if (guess < randomNumber) {
    message.textContent = 'Demasiado bajo. Intenta de nuevo.';
  } else {
    message.textContent = 'Demasiado alto. Intenta de nuevo.';
  }

  if (attempts >= monsterAttackTurn) {
    alert('Ese monstruo ha sido más rápido');
    endGame(false);
  }
});

function endGame(won) {
  guessButton.disabled = true;
  guessInput.disabled = true;
  gameOver = true;
  restartButton.style.display = 'inline-block';
}

restartButton.addEventListener('click', () => {
  initGame();
});

window.onload = initGame;
