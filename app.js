'use strict';

// Game bindings
const newGame = document.getElementById('new-game');
const playerOneHitMeBtn = document.querySelector(
  '.p1-button-container .hit-me'
);
const playerTwoHitMeBtn = document.querySelector(
  '.p2-button-container .hit-me'
);
const playerOneStandBtn = document.querySelector('.p1-button-container .stand');
const playerTwoStandBtn = document.querySelector('.p2-button-container .stand');
let game, player1, player2, deck, deckId;

// Get a new deck to use from 'Deck of Cards API'
async function getDeck(url) {
  try {
    let response = await fetch(url);
    deck = await response.json();
    deckId = await deck.deck_id;
  } catch (err) {
    console.error('Oops! Error fetching and parsing data: ', err);
  }
}

// Start new game by clicking 'New Game' button
newGame.addEventListener('click', () => {
  if (!player1 && !player2) {
    // Prompt user to create players
    player1 = new Player(prompt('Player one, please enter your name'), 0, []);
    player2 = new Player(prompt('Player two, please enter your name'), 0, []);

    // Create new game
    game = new Game([player1, player2]);
    game.startGame();

    // Create new deck instance
    getDeck('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  } else {
    // Reset game
    // TODO: implement better game reset logic
    window.location.reload();
  }
});

// Player one behavior
const playerOneHitMe = (e) => player1.hitMe(e);
const playerOneStand = (e) => player1.stand(e);
playerOneHitMeBtn.addEventListener('click', playerOneHitMe);
playerOneStandBtn.addEventListener('click', playerOneStand);

// Player two behavior
const playerTwoHitMe = (e) => player2.hitMe(e);
const playerTwoStand = (e) => player2.stand(e);
playerTwoHitMeBtn.addEventListener('click', playerTwoHitMe);
playerTwoStandBtn.addEventListener('click', playerTwoStand);
