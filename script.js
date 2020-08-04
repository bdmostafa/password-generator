// https://www.petefreitag.com/cheatsheets/ascii-codes/

// Selectors
const charRange = document.getElementById('char-range');
const charAmount = document.getElementById('char-amount');
const formPassword = document.getElementById('form');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const passwordDisplay = document.getElementById('password-display');
const eyePassword = document.getElementById('eye-password');
const eyeText = document.getElementById('eye-text');
const weakStatus = document.getElementById('weak');
const mediumStatus = document.getElementById('medium');
const strongStatus = document.getElementById('strong');

// From ASCII codes cheat sheets
const uppercaseCharCodes = lowToHighArr(65, 90);
const lowercaseCharCodes = lowToHighArr(97, 122);
const numbersCharCodes = lowToHighArr(48, 57);
const symbolCharCodes = lowToHighArr(33, 47).concat(lowToHighArr(58, 64)).concat(lowToHighArr(91, 96)).concat(lowToHighArr(123, 126));

// Event Listeners
charRange.addEventListener('input', rangeWithAmount);
formPassword.addEventListener('submit', (event) => {
    event.preventDefault();
    const charAmountNum = charAmount.value;
    const uppercase = uppercaseElement.checked;
    const lowercase = lowercaseElement.checked;
    const numbers = numbersElement.checked;
    const symbols = symbolsElement.checked;

    const password = passwordGenerator(charAmountNum, uppercase, lowercase, numbers, symbols);
    passwordDisplay.value = password;
    passwordStatus(charAmountNum, uppercase, lowercase, numbers, symbols);
})
eyePassword.addEventListener('click', showPassword);
eyeText.addEventListener('click', hidePassword);


// Functions
function rangeWithAmount(evt) {
    const val = evt.target.value;
    charRange.value = val;
    charAmount.value = val;
}

function passwordGenerator(charAmountNum, uppercase, lowercase, numbers, symbols) {
    let charCodesAll = [];
    if (uppercase) charCodesAll = uppercaseCharCodes;
    if (lowercase) charCodesAll = charCodesAll.concat(lowercaseCharCodes);
    if (numbers) charCodesAll = charCodesAll.concat(numbersCharCodes);
    if (symbols) charCodesAll = charCodesAll.concat(symbolCharCodes);

    const password = [];
    for (let i = 0; i < charAmountNum; i++) {
        const charCode = charCodesAll[Math.floor(Math.random() * charCodesAll.length)];
        password.push(String.fromCharCode(charCode));
    }
    return password.join('');
}

function lowToHighArr(low, high) {
    const arr = [];
    for (let i = low; i <= high; i++) {
        arr.push(i);
    }
    return arr;
}

function showPassword() {
    eyePassword.style.display = 'none';
    passwordDisplay.type = 'text';
    eyeText.style.display = 'block';
}

function hidePassword() {
    eyePassword.style.display = 'block';
    passwordDisplay.type = 'password';
    eyeText.style.display = 'none';
}

function passwordStatus(charAmountNum, uppercase, lowercase, numbers, symbols) {
    weakStatus.style.display = 'none';
    mediumStatus.style.display = 'none';
    strongStatus.style.display = 'none';
    if (charAmountNum > 12 && numbers && symbols && uppercase || charAmountNum > 12 && numbers && symbols && lowercase || charAmountNum > 12 && numbers && symbols && uppercase && lowercase) strongStatus.style.display = 'block';
    else if (charAmountNum >= 12 && numbers || charAmountNum >= 12 && symbols || charAmountNum >= 8 && symbols && numbers) mediumStatus.style.display = 'block';
    else weakStatus.style.display = 'block';
}