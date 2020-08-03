// https://www.petefreitag.com/cheatsheets/ascii-codes/

// Selectors
const charRange = document.getElementById('char-range');
const charAmount = document.getElementById('char-amount');
const formPassword = document.getElementById('form');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');


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
})


// Functions
function rangeWithAmount(evt) {
    const val = evt.target.value;
    charRange.value = val;
    charAmount.value = val;
}

function passwordGenerator(charAmountNum, uppercase, lowercase, numbers, symbols) {
    console.log(String.fromCharCode(90));

}