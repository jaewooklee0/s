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

// Simulated card dealing function with suits
function dealCard() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return { value: randomValue, suit: randomSuit }; // Return card as an object
}

// Function to render hands
function renderHands() {
    // Show dealer's first card and a placeholder for the hidden card
    document.getElementById('dealer-hand').innerText = dealerHidden 
        ? `${dealerHand[0].value}${dealerHand[0].suit}, ???` 
        : dealerHand.map(card => `${card.value}${card.suit}`).join(', '); // Show both cards if not hidden

    document.getElementById('player-hand').innerText = playerHand.map(card => `${card.value}${card.suit}`).join(', ');
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
    let total = 0;
    let aceCount = 0;

    for (let card of hand) {
        if (card.value === 'A') {
            aceCount++;
            total += 11; // Count Ace as 11 initially
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            total += 10; // Face cards are worth 10
        } else {
            total += parseInt(card.value); // Number cards are worth their value
        }
    }

    // Adjust for Aces if total is over 21
    while (total > 21 && aceCount > 0) {
        total -= 10; // Count Ace as 1
        aceCount--;
    }

    return total;
}

// Function to handle standing
function stand() {
    revealDealerHand(); // Reveal dealer's hand
    playDealerTurn(); // Dealer plays their turn
}

// Function to reveal dealer's hand
function revealDealerHand() {
    dealerHidden = false; // Set the flag to false
    document.getElementById('dealer-hand').innerText = dealerHand.map(card => `${card.value}${card.suit}`).join(', ');
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

// Function to handle double down
function doubleDown() {
    if (balance >= betAmount) { // Check if there are enough funds to double down
        balance -= betAmount; // Deduct the bet amount from balance
        betAmount *= 2; // Double the bet
        document.getElementById('balance').innerText = `$${balance}`;
        playerHand.push(dealCard()); // Give one more card to the player
        renderHands(); // Update the UI with the new hand
        checkBust(); // Check if the player has busted after doubling down
        if (!checkBust()) { // If player has not busted, proceed to dealer's turn
            revealDealerHand();
            playDealerTurn(); // Dealer plays their turn
        }
    } else {
        alert("You do not have enough balance to double down.");
    }
}

// Function to go back to the casino
function goBack() {
    // Navigate back to the casino page (assuming it's index.html)
    window.location.href = "index.html"; // Replace with your actual casino page URL if different
}

// Call the startGame function at the beginning to set up the game
startGame();
