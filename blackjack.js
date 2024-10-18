let deck = [];
let playerHand = [];
let dealerHand = [];
let playerBalance = parseFloat(localStorage.getItem('balance')) || 1000;
let currentBet = 0;

// Update balance on load
document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;

// Function to place a bet
function placeBet() {
  const betAmount = parseInt(document.getElementById('bet-amount').value);
  
  if (betAmount > playerBalance || betAmount <= 0) {
    alert("Invalid bet amount.");
    return;
  }
  
  currentBet = betAmount;
  playerBalance -= currentBet;
  document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;
  localStorage.setItem('balance', playerBalance); // Update balance
  
  startGame();
}

// Function to start a new Blackjack game
function startGame() {
  deck = createDeck();
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];

  updateHands();
  checkForBlackjack();
}

// Function to create and shuffle a new deck
function createDeck() {
  let suits = ['♠', '♥', '♦', '♣'];
  let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let newDeck = [];
  
  for (let suit of suits) {
    for (let value of values) {
      newDeck.push({ value, suit });
    }
  }
  
  return shuffleDeck(newDeck);
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Function to draw a card from the deck
function drawCard() {
  return deck.pop();
}

// Function to calculate the hand value
function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;
  
  hand.forEach(card => {
    if (card.value === 'A') {
      value += 11;
      aces++;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  });

  while (value > 21 && aces) {
    value -= 10;
    aces--;
  }
  
  return value;
}

// Function to update hands
function updateHands() {
  const dealerHandEl = document.getElementById('dealer-hand');
  const playerHandEl = document.getElementById('player-hand');
  
  dealerHandEl.innerText = dealerHand.map(card => `${card.value}${card.suit}`).join(' ');
  playerHandEl.innerText = playerHand.map(card => `${card.value}${card.suit}`).join(' ');
}

// Function to check for immediate blackjack
function checkForBlackjack() {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);
  
  if (playerValue === 21) {
    endGame('Blackjack! You win.');
  } else if (dealerValue === 21) {
    endGame('Dealer has Blackjack! You lose.');
  }
}

// Function for player hitting (drawing a card)
function hit() {
  playerHand.push(drawCard());
  updateHands();
  
  const playerValue = calculateHandValue(playerHand);
  
  if (playerValue > 21) {
    endGame('Bust! You lose.');
  }
}

// Function for standing
function stand() {
  let dealerValue = calculateHandValue(dealerHand);
  
  while (dealerValue < 17) {
    dealerHand.push(drawCard());
    dealerValue = calculateHandValue(dealerHand);
  }
  
  updateHands();
  determineWinner();
}

// Function to determine the winner
function determineWinner() {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);
  
  if (dealerValue > 21 || playerValue > dealerValue) {
    endGame('You win!');
  } else if (playerValue < dealerValue) {
    endGame('You lose.');
  } else {
    endGame('It\'s a tie.');
  }
}

// Function to end the game
function endGame(result) {
  document.getElementById('result').innerText = result;
  
  if (result.includes('win')) {
    playerBalance += currentBet * 2;
  }
  
  document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;
  localStorage.setItem('balance', playerBalance); // Save updated balance
}

// Go back to the casino
function goBack() {
  window.location.href = 'index.html'; // Back to the main casino page
}
