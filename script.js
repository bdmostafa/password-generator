// https://www.petefreitag.com/cheatsheets/ascii-codes/

// Selectors ==============================================================
let validation = false;
const inputElements = document.querySelectorAll('.input');
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
const statusElement = document.getElementById('status-password');
const weakStatus = document.getElementById('weak');
const mediumStatus = document.getElementById('medium');
const strongStatus = document.getElementById('strong');
const copyElement = document.getElementById('copy');

// From ASCII codes cheat sheets
const uppercaseCharCodes = lowToHighArr(65, 90);
const lowercaseCharCodes = lowToHighArr(97, 122);
const numbersCharCodes = lowToHighArr(48, 57);
const symbolCharCodes = lowToHighArr(33, 47).concat(lowToHighArr(58, 64)).concat(lowToHighArr(91, 96)).concat(lowToHighArr(123, 126));

// Event Listeners ============================================================
document.addEventListener('DOMContentLoaded', setDefault);
charRange.addEventListener('input', rangeWithAmount);
inputElements.forEach((e) => e.addEventListener('change', setDefault));
formPassword.addEventListener('submit', (event) => {
    event.preventDefault();

    const charAmountNum = charAmount.value;
    const uppercase = uppercaseElement.checked;
    const lowercase = lowercaseElement.checked;
    const numbers = numbersElement.checked;
    const symbols = symbolsElement.checked;

    submitValidation(charAmountNum, uppercase, lowercase, numbers, symbols);

    if (!validation) return setDefault();
    else {
        const password = passwordGenerator(charAmountNum, uppercase, lowercase, numbers, symbols);
        passwordDisplay.value = password;

        // showPassword();
        passwordStatus(charAmountNum, uppercase, lowercase, numbers, symbols);
    }

})
eyePassword.addEventListener('click', showPassword);
eyeText.addEventListener('click', hidePassword);
copyElement.addEventListener('click', copyPassword);


// Functions =========================================================================
// Default function to reset
function setDefault() {
    statusElement.style.display = 'block';
    weakStatus.style.display = 'none';
    mediumStatus.style.display = 'none';
    strongStatus.style.display = 'none';
    copyElement.style.display = 'block';
    copyElement.innerText = 'Copy';
    copyElement.style.fontWeight = 'normal';
    passwordDisplay.value = '';
}

// Function to adjust range number with amount
function rangeWithAmount(evt) {
    const val = evt.target.value;
    charRange.value = val;
    charAmount.value = val;
}

// Function to validate SUBMIT button
function submitValidation(charAmountNum, uppercase, lowercase, numbers, symbols) {
    if (charAmountNum < 6) {
        // setDefault();
        return alert('Range must be 6 or higher. Please try again!');
    }
    if (!uppercase && !lowercase && !numbers && !symbols) {
        // setDefault();
        return alert('Please select at least one element to generate your password');
    }
    // setDefault();
    return validation = true;
}

// Function to generate PASSWORD
function passwordGenerator(charAmountNum, uppercase, lowercase, numbers, symbols) {
    setDefault();

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

// Function to range (low to high) from ASCII codes table cheat sheets
function lowToHighArr(low, high) {
    const arr = [];
    for (let i = low; i <= high; i++) {
        arr.push(i);
    }
    return arr;
}

// Function to display password in TEXT format
function showPassword() {
    eyePassword.style.display = 'none';
    passwordDisplay.type = 'text';
    eyeText.style.display = 'block';
}

// Function to display password in PASSWORD format
function hidePassword() {
    eyePassword.style.display = 'block';
    passwordDisplay.type = 'password';
    eyeText.style.display = 'none';
}

// Function to check password if it is WEAK, MEDIUM or STRONG
function passwordStatus(charAmountNum, uppercase, lowercase, numbers, symbols) {
    statusElement.style.display = 'none';

    // console.log(passwordDisplay.value == '');

    if (!(passwordDisplay.value === '')) {
        if (charAmountNum >= 12 && numbers && symbols && uppercase ||
            charAmountNum >= 12 && numbers && symbols && lowercase ||
            charAmountNum >= 12 && numbers && symbols && uppercase && lowercase) {
            document.getElementById('weak').style.display = 'none';
            return strongStatus.style.display = 'block';
        } else if (charAmountNum >= 12 && symbols ||
            charAmountNum >= 8 && symbols && numbers) {
            document.getElementById('weak').style.display = 'none';
            return mediumStatus.style.display = 'block';
        } else return weakStatus.style.display = 'block';
    }
    // weakStatus.style.display = 'block';
}

// Function to COPY password and paste it everywhere
function copyPassword() {
    copyElement.style.display = 'block';
    copyElement.innerText = 'Copied!';
    copyElement.style.fontWeight = 'bold';

    // Select the password
    passwordDisplay.select();
    document.execCommand('copy');
}