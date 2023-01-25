'use strict';
// вибір елементів
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //одне і теж але швидше чим querySelector дя ід
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, gameState, preNum;

//starting conditions
const init = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('active');
  player0El.classList.add('active');
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  preNum = 0;
  gameState = true;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('active');
  player1El.classList.toggle('active'); //перемикання елементів active state
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (gameState) {
    // 1 generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2 display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`;

    // 3 check for rolled 1
    if (dice > preNum) {
      // add dice to current scope
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      preNum = dice;
      console.log(preNum);
    } else {
      // switch to next player
      switchPlayer();
      preNum = 0;
      diceEl.classList.add('hidden');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gameState) {
    //1 Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2 check if player's score is >= 100
    if (scores[activePlayer] >= 42) {
      gameState = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active');
    } else {
      switchPlayer();
      // switch player
    }
    preNum = 0;
    diceEl.classList.add('hidden');
  }
});
btnNew.addEventListener('click', function () {
  init();
});
