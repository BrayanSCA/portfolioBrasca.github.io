const modal = document. getElementById('calc-modal');
const displayCurrent = document.getElementById('current-operation');
const displayPrev = document.getElementById('prev-operation');
let currentInput = '0';
let operator = null;
let previousInput = '';
let isCalcOpen = false; //saber si el modal está abierto

function openCalc() {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; //bloquea el scroll del fondo
  isCalcOpen = true; //Habilita funciones de la calculadora
}

function closeCalc() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; //Devuelve el scroll
  isCalcOpen = false; //Deshabilita funciones de la calculadora
}

// Cerrar si hacen clic fuera de la calculadora 
window.addEventListener('click', (e)=> {
  if (e.target === modal) {
    closeCalc();
  }
})

function updateDisplay() {
  displayCurrent.innerText = currentInput;
  displayPrev.innerText = previousInput + (operator || '');
}

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return;
  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') calculate();
  operator = op;
  previousInput = currentInput;
  currentInput = '';
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function deleteNumber() {
  currentInput = currentInput.toString().slice(0, -1);
  if (currentInput === '') currentInput = '0';
  updateDisplay();
}

function calculate () {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/': result = current === 0 ? "Error": prev / current;
    break;
    default: return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

document.addEventListener('keydown', (event)=> {
  // Si la calculadora NO está abierta, ignora cualquier tecla
  if (!isCalcOpen) return;
  
  const key = event.key;

  // Números y punto
  if (!isNaN(key) || key === '.') {
    appendNumber(key);
  }
  // Operadores
  else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  }
  // Enter para calcular
  else if (key === 'Enter') {
    event.preventDefault(); //Evita comportamientos extraños del navegador
    calculate();
  }
  // Escape para limpiar (C)
  else if (key === 'Escape') {
    clearDisplay();
  }
  // Backspace para borrar (DEL)
  else if (key === 'Backspace') {
    deleteNumber();
  }
})