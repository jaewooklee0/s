let balance = 1000; // Starting balance

// Function to add funds in increments of 1000
function addFunds() {
  balance += 1000;
  document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
  localStorage.setItem('balance', balance); // Store balance in localStorage
}

// On load, update balance from localStorage
window.onload = function () {
  const storedBalance = localStorage.getItem('balance');
  if (storedBalance) {
    balance = parseFloat(storedBalance);
    document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
  }
};
