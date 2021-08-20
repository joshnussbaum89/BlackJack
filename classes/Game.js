'use strict';

class Game {
  constructor(players) {
    this.players = [...players];
  }

  // Remove gate and display player information
  startGame() {
    document.getElementById('gate').style.display = 'none';
    document.getElementById('players').style.display = 'grid';

    this.displayPlayerInfo();
  }

  displayPlayerInfo() {
    // Name
    document.querySelector(
      '.player-one-name'
    ).innerText = `Player One: ${player1.name}`;
    document.querySelector(
      '.player-two-name'
    ).innerText = `Player Two: ${player2.name}`;

    // Score
    document.querySelector(
      '.player-one-score'
    ).innerText = `score: ${player1.score}`;
    document.querySelector(
      '.player-two-score'
    ).innerText = `score: ${player2.score}`;
  }
}
