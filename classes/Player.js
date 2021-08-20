'use strict';

// Card bindings
let card,
  cardsArray,
  cardVal,
  playerOneCards,
  playerTwoCards,
  isFaceCard,
  isAce,
  cardNumVal = 0;

const title = document.querySelector('#gate h1');

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.cards = [];
    // Set to true when player clicks "hold"
    this.hold = false;
    this.won = false;
  }

  displayGate() {
    document.getElementById('gate').style.display = 'block';
    document.getElementById('players').style.display = 'none';
  }

  // Immediately win/lose if player score is equal to 21 or goes over 21
  checkScore() {
    if (this.score > 21) {
      this.displayGate();
      title.innerText = `${this.name} lost!`;
    } else if (this.score === 21) {
      this.won = true;
      this.displayGate();
      title.innerText = `${this.name} won!`;
    }
  }

  checkForWin() {
    // If score is tied
    if (player1.score === player2.score) {
      this.displayGate();
      title.innerText = `Tie!`;
    } else {
      // Calculate winner based on high score
      const highScore = Math.max(player1.score, player2.score);
      const { name: winningPlayerName } = [player1, player2].filter(
        (player) => player.score === highScore
      )[0];

      // Display game outcome to user
      this.displayGate();
      title.innerText = `${winningPlayerName} won!`;
    }
  }

  // Generate random card
  async hitMe(event) {
    await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => res.json())
      .then((res) => {
        card = res;
        // Add card to Player cards array
        this.cards.push(card);
        // String - Card number value - ex/ 2, 9, KING, ACE etc.
        cardVal = card.cards[0].value;

        // Bool - Check for face cards or ACE
        isFaceCard =
          cardVal === 'JACK' || cardVal === 'QUEEN' || cardVal === 'KING';
        isAce = cardVal === 'ACE';

        if (isFaceCard) {
          this.score += 10;
          this.checkScore();
        } else if (isAce) {
          this.score += 11;
          this.checkScore();
        } else {
          this.score += +res.cards[0].value;
          this.checkScore();
        }

        // Update player score
        game.displayPlayerInfo();
        this.displayCards(event);
      })
      .catch((err) =>
        console.error('Oops! Error fetching and parsing data: ', err)
      );
  }

  stand(event) {
    const { target } = event;
    const hitMeBtn = target.previousElementSibling;

    // Set players 'hold' status to 'true'
    this.hold = true;

    // Disable buttons
    target.disabled = true;
    hitMeBtn.disabled = true;

    // Change cursor style to inform user that their turn is over
    target.style.cursor = 'not-allowed';
    hitMeBtn.style.cursor = 'not-allowed';

    // Check who won the game when both players choose to 'hold'
    if (player1.hold && player2.hold) {
      this.checkForWin();
    }
  }

  displayCards(event) {
    cardsArray = this.cards;
    playerOneCards = document.querySelector('.player-one-cards');
    playerTwoCards = document.querySelector('.player-two-cards');

    // Dynamically render HTML
    let cardHTML = '';
    let playerTarget = event.target.getAttribute('data-target');

    // Loop through cardsArray and display cards to DOM
    cardsArray.forEach((card) => {
      cardHTML += `
        <img
        src="${card.cards[0].images.svg}"
        alt="${card.cards[0].value} of ${card.cards[0].suit}"
        class="card"
        />
      `;
    });

    // Update the cards displayed
    if (playerTarget === 'player-one') {
      playerOneCards.innerHTML = cardHTML;
    } else {
      playerTwoCards.innerHTML = cardHTML;
    }
  }
}
