let balance = parseFloat(localStorage.getItem('balance')) || 100; // Default balance
let starsCollected = 0; // Variable to keep track of stars collected
let currentMultiplier = 1; // Current multiplier based on mines
let numMines = 0; // Number of mines for the current game
document.getElementById('balance-display').innerText = `Balance: $${balance.toFixed(2)}`;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

    // Implement your actual login logic here

    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

    // Implement your actual registration logic here
    alert("Registration successful!");
    showLogin();
}

function showRegister() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
}

function showLogin() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

function deposit() {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    if (amount > 0) {
        balance += amount; // Increase balance
        localStorage.setItem('balance', balance);
        document.getElementById('balance-display').innerText = `Balance: $${balance.toFixed(2)}`;
        hideDeposit(); // Hide deposit UI
    } else {
        alert("Please enter a valid amount.");
    }
}

function showDeposit() {
    document.getElementById('deposit-container').style.display = 'block';
}

function hideDeposit() {
    document.getElementById('deposit-container').style.display = 'none';
}

function withdraw() {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    if (amount > 0 && amount <= balance) {
        balance -= amount; // Decrease balance
        localStorage.setItem('balance', balance);
        document.getElementById('balance-display').innerText = `Balance: $${balance.toFixed(2)}`;
        hideWithdraw(); // Hide withdraw UI
    } else {
        alert("Please enter a valid amount.");
    }
}

function showWithdraw() {
    document.getElementById('withdraw-container').style.display = 'block';
}

function hideWithdraw() {
    document.getElementById('withdraw-container').style.display = 'none';
}

function startMineGame() {
    const betAmount = parseFloat(document.getElementById('bet-amount-mine').value);
    numMines = parseInt(document.getElementById('num-mines').value);
    
    // Validate bet amount and number of mines
    if (isNaN(betAmount) || betAmount <= 0 || isNaN(numMines) || numMines < 1 || numMines > 25) {
        alert("Please enter a valid bet amount and number of mines (1-25).");
        return;
    }

    if (betAmount > balance) {
        alert("Insufficient balance.");
        return;
    }

    balance -= betAmount; // Deduct bet amount from balance
    localStorage.setItem('balance', balance);
    document.getElementById('balance-display').innerText = `Balance: $${balance.toFixed(2)}`;
    
    starsCollected = 0; // Reset stars collected
    document.getElementById('mine-grid').innerHTML = ''; // Clear previous grid
    currentMultiplier = calculateMultiplier(numMines); // Calculate current multiplier

    // Create mine grid
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => collectStar(cell));
        document.getElementById('mine-grid').appendChild(cell);
    }
    
    document.getElementById('mine-game-container').style.display = 'block';
    document.getElementById('cash-out-button').style.display = 'block';
}

function collectStar(cell) {
    if (!cell.classList.contains('cell')) return; // Prevent further clicks
    cell.classList.remove('cell');
    cell.classList.add('star');
    starsCollected++;
}

function cashOut() {
    const totalWinnings = starsCollected * currentMultiplier * parseFloat(document.getElementById('bet-amount-mine').value);
    balance += totalWinnings; // Add winnings to balance
    localStorage.setItem('balance', balance);
    document.getElementById('balance-display').innerText = `Balance: $${balance.toFixed(2)}`;
    alert(`You cashed out $${totalWinnings.toFixed(2)}!`);
    resetMineGame();
}

function resetMineGame() {
    starsCollected = 0; // Reset stars collected
    currentMultiplier = 1; // Reset multiplier
    numMines = 0; // Reset number of mines
    document.getElementById('mine-game-container').style.display = 'none';
}

function calculateMultiplier(numMines) {
    if (numMines === 1) return 1.1;
    if (numMines === 2) return 1.2;
    if (numMines === 3) return 1.4;
    // Continue defining multipliers for 4-25 mines
    if (numMines === 4) return 1.5;
    if (numMines === 5) return 1.7;
    if (numMines === 6) return 1.9;
    if (numMines === 7) return 2.1;
    if (numMines === 8) return 2.3;
    if (numMines === 9) return 2.5;
    if (numMines === 10) return 2.7;
    if (numMines === 11) return 2.9;
    if (numMines === 12) return 3.1;
    if (numMines === 13) return 3.5;
    if (numMines === 14) return 4.0;
    if (numMines === 15) return 4.5;
    if (numMines === 16) return 5.0;
    if (numMines === 17) return 5.5;
    if (numMines === 18) return 6.0;
    if (numMines === 19) return 6.5;
    if (numMines === 20) return 7.0;
    if (numMines === 21) return 7.5;
    if (numMines === 22) return 8.0;
    if (numMines === 23) return 8.5;
    if (numMines === 24) return 9.0;
    if (numMines === 25) return 10.0;
    return 1; // Default if not found
}

function startDiceGame() {
    const betAmount = parseFloat(document.getElementById('bet-amount-dice').value);
    const betType = document.querySelector('input[name="bet-type"]:checked').value;
    
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }
    
    if (betAmount > balance) {
        alert("Insufficient balance.");
        return;
    }

    balance -= betAmount; // Deduct bet amount from balance
    localStorage.setItem('balance', balance);
    document.getElementById('balance-display').innerText = `Balance: $${balance.toFixed(2)}`;
    
    const roll = Math.floor(Math.random() * 100) + 1; // Roll dice between 1-100
    const resultText = `You rolled: ${roll}`;
    document.getElementById('dice-result').innerText = resultText;

    if ((betType === 'above' && roll > 50) || (betType === 'below' && roll <= 50)) {
        const winnings = betAmount * 2; // Winning is double the bet amount
        balance += winnings; // Add winnings to balance
        localStorage.setItem('balance', balance);
        alert(`You won $${winnings.toFixed(2)}!`);
    } else {
        alert("You lost your bet.");
    }
    
    document.getElementById('balance-display').innerText = `Balance: $${balance.toFixed(2)}`;
}

function logout() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    balance = 100; // Reset balance on logout for demo
    localStorage.setItem('balance', balance);
    document.getElementById('balance-display').innerText = `Balance: $${balance.toFixed(2)}`;
}
