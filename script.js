let balance = 1000; // Initial balance

// Function to add funds in increments of 1000
function addFunds() {
  balance += 1000;
  document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
  localStorage.setItem('balance', balance); // Store balance in localStorage
}

// Function to navigate to Blackjack page
function goToBlackjack() {
  window.location.href = 'blackjack.html'; // Navigate to Blackjack page
}

// On page load, update balance from localStorage
window.onload = function () {
  const storedBalance = localStorage.getItem('balance');
  if (storedBalance) {
    balance = parseFloat(storedBalance);
    document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
  }
};

