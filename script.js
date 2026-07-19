const display = document.getElementById('display');

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let resultShown = false;

const buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleButtonClick);
}

function handleButtonClick(event) {
  const button = event.target;
  const action = button.getAttribute('data-action');
  const value = button.getAttribute('data-value');

  if (action) {
    if (action === 'clear') {
      clearCalculator();
    } else if (action === 'equals') {
      calculateResult();
    } else if (action === 'sign') {
      toggleSign();
    } else if (action === 'percent') {
      convertToPercent();
    }
    return;
  }

  if (button.classList.contains('operator')) {
    operatorPressed(value);
  } else if (value !== null) {
    numberPressed(value);
  }
}

function numberPressed(value) {
  if (resultShown) {
    display.value = '';
    resultShown = false;
  }

  if (currentOperator === '') {
    if (value === '.' && firstNumber.includes('.')) return;
    firstNumber += value;
    display.value = firstNumber;
  } else {
    if (value === '.' && secondNumber.includes('.')) return;
    secondNumber += value;
    display.value = secondNumber;
  }
}

function operatorPressed(operator) {
  if (firstNumber === '') {
    return;
  }

  if (currentOperator !== '' && secondNumber !== '') {
    calculateResult();
    firstNumber = display.value;
  }

  currentOperator = operator;
  secondNumber = '';
}

function calculateResult() {
  if (firstNumber === '' || secondNumber === '' || currentOperator === '') {
    return;
  }

  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);
  let result = 0;

  if (currentOperator === '+') {
    result = num1 + num2;
  } else if (currentOperator === '-') {
    result = num1 - num2;
  } else if (currentOperator === '*') {
    result = num1 * num2;
  } else if (currentOperator === '/') {
    if (num2 === 0) {
      display.value = 'Error';
      clearCalculator();
      return;
    } else {
      result = num1 / num2;
    }
  }

  display.value = result;
  firstNumber = String(result);
  secondNumber = '';
  currentOperator = '';
  resultShown = true;
}

function clearCalculator() {
  firstNumber = '';
  secondNumber = '';
  currentOperator = '';
  resultShown = false;
  display.value = '';
}

function toggleSign() {
  if (currentOperator === '') {
    if (firstNumber !== '') {
      firstNumber = String(parseFloat(firstNumber) * -1);
      display.value = firstNumber;
    }
  } else {
    if (secondNumber !== '') {
      secondNumber = String(parseFloat(secondNumber) * -1);
      display.value = secondNumber;
    }
  }
}

function convertToPercent() {
  if (currentOperator === '') {
    if (firstNumber !== '') {
      firstNumber = String(parseFloat(firstNumber) / 100);
      display.value = firstNumber;
    }
  } else {
    if (secondNumber !== '') {
      secondNumber = String(parseFloat(secondNumber) / 100);
      display.value = secondNumber;
    }
  }
}
