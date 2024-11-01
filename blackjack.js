let dealerHand = []; // Array to store dealer's hand
let playerHand = []; // Array to store player's hand
let balance = 1000; // Initial balance
let betAmount = 0; // Amount to bet
let dealerHidden = true; // Flag to track if dealer's second card is hidden

// Function to place a bet
function placeBet() {
    const betInput = document.getElementById('bet-amount');
    betAmount = parseInt(betInput.value);

    if (betAmount > 0 && betAmount <= balance) {
        balance -= betAmount;
        document.getElementById('balance').innerText = `$${balance}`;
        startGame(); // Start the game after placing the bet
    } else {
        alert("Please enter a valid bet amount.");
    }
}

// Function to start the game
function startGame() {
    dealerHand = [];
    playerHand = [];
    dealerHidden = true; // Reset the dealer's hidden state
    dealInitialCards(); // Deal initial cards
    renderHands(); // Render hands on the UI
}

// Function to deal initial cards
function dealInitialCards() {
    dealerHand.push(dealCard(), dealCard());
    playerHand.push(dealCard(), dealCard());
}

// Simulated card dealing function (you can customize this)
function dealCard() {
    // Return a random card value (1-11 for simplicity, assuming Ace is 11)
    return Math.floor(Math.random() * 10) + 1; // Replace with real card logic
}

// Function to render hands
function renderHands() {
    // Show dealer's first card and a placeholder for the hidden card
    document.getElementById('dealer-hand').innerText = dealerHidden 
        ? dealerHand[0] + ', ???' 
        : dealerHand.join(', '); // Show both cards if not hidden

    document.getElementById('player-hand').innerText = playerHand.join(', ');
}

// Function to handle hitting
function hit() {
    playerHand.push(dealCard());
    renderHands(); // Update the UI with the new hand
    checkBust(); // Check if the player has busted
}

// Function to check if the player has busted
function checkBust() {
    const playerTotal = getHandTotal(playerHand);
    if (playerTotal > 21) {
        alert("You busted!"); // Alert the player
        revealDealerHand(); // Reveal dealer's hand
    }
}

// Function to get the total value of a hand
function getHandTotal(hand) {
    return hand.reduce((sum, card) => sum + card, 0);
}

// Function to handle standing
function stand() {
    revealDealerHand(); // Reveal dealer's hand
    playDealerTurn(); // Dealer plays their turn
}

// Function to reveal dealer's hand
function revealDealerHand() {
    dealerHidden = false; // Set the flag to false
    document.getElementById('dealer-hand').innerText = dealerHand.join(', ');
}

// Function for the dealer's turn
function playDealerTurn() {
    while (getHandTotal(dealerHand) < 17) { // Dealer hits until 17 or higher
        dealerHand.push(dealCard());
    }
    determineWinner(); // Determine the winner after dealer's turn
}

// Function to determine the winner
function determineWinner() {
    const playerTotal = getHandTotal(playerHand);
    const dealerTotal = getHandTotal(dealerHand);

    if (dealerTotal > 21) {
        alert("Dealer busts! You win!");
        balance += betAmount * 2; // Player wins double the bet
    } else if (playerTotal > dealerTotal) {
        alert("You win!");
        balance += betAmount * 2; // Player wins double the bet
    } else if (playerTotal < dealerTotal) {
        alert("Dealer wins!");
    } else {
        alert("It's a tie!");
        balance += betAmount; // Return the bet amount
    }

    document.getElementById('balance').innerText = `$${balance}`; // Update balance on UI
}

// Function to handle double down (implement if desired)
function doubleDown() {
    // Logic for doubling down (optional)
}

// Function to go back to casino (you can implement this based on your layout)
function goBack() {
    // Logic to navigate back to the casino (not implemented here)
}

// Call the startGame function at the beginning to set up the game
startGame();
