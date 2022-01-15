'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnModal = document.querySelector('.btn--modal');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const modalWindow = document.querySelector('.modal');
const current = document.querySelector('.current');
// const score0El = document.getElementById('current--0');
// const score1El = document.getElementById('current--1');
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

const roll = function () {
  btnModal.classList.add('hidden');
  if (playing) {
    //Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //   current0 = current0 + dice;
    //   console.log(current0);
    //   current0.textContent = 'current0';
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //console.log(currentScore);
    } else {
      //switchplayer
      switchPlayer();
    }
  }
};
const hold = function () {
  btnModal.classList.add('hidden');
  if (playing) {
    score[`${activePlayer}`] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[`${activePlayer}`];
    if (score[`${activePlayer}`] >= 100) {
      console.log(`Player ${activePlayer + 1} win!`);
      //wyskakujące okienko
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
      playing = false;
      diceEl.classList.add('hidden');

      //newGame();
    } else {
      switchPlayer();
    }
  }
};
const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  playing = true;
  modalWindow.classList.add('hidden');
  btnModal.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  current.classList.remove('hidden');
};

const modal = function () {
  modalWindow.classList.remove('hidden');
  btnModal.classList.add('hidden');
};

//Rolling doce functionality
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', newGame);
btnModal.addEventListener('click', modal);

/*
Możliwość wpisania nazw graczy
Wyskakujące okienko kto wygrał
Napisać instrukcję do gry
*/
