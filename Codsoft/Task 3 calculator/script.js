document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.button');
    const display = document.getElementById('display');
  
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let resetDisplay = false;
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
  
        if (value === 'C') {
          currentInput = '';
          firstOperand = null;
          operator = null;
          resetDisplay = false;
          display.textContent = '';
          return;
        }
  
        if (value === '=') {
          if (operator && firstOperand !== null) {
            const secondOperand = parseFloat(currentInput);
            currentInput = performCalculation(firstOperand, secondOperand, operator);
            display.textContent = currentInput;
            firstOperand = null;
            operator = null;
            resetDisplay = true;
          }
          return;
        }
  
        if (['+', '-', '*', '/'].includes(value)) {
          if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
          } else if (operator) {
            const secondOperand = parseFloat(currentInput);
            firstOperand = performCalculation(firstOperand, secondOperand, operator);
            display.textContent = firstOperand;
          }
          operator = value;
          resetDisplay = true;
          return;
        }
  
        if (resetDisplay) {
          currentInput = value;
          resetDisplay = false;
        } else {
          currentInput += value;
        }
  
        display.textContent = currentInput;
      });
    });
  
    function performCalculation(first, second, operator) {
      switch (operator) {
        case '+':
          return (first + second).toString();
        case '-':
          return (first - second).toString();
        case '*':
          return (first * second).toString();
        case '/':
          return (first / second).toString();
        default:
          return '';
      }
    }
  });
  