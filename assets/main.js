const clipBoardButton = document.getElementById('copy-button');
const lengthRange = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.querySelector('.generate');
const passwordText = document.getElementById('text-to-copy');
const strengthWord = document.querySelector('.strength .word');
const strengthBars = document.querySelector('.strength .bars');

clipBoardButton.addEventListener('click', copyToClipboard);
lengthRange.addEventListener('input', refreshRangeValue);
generateButton.addEventListener('click', checkAndCallGenerate);

function checkAndCallGenerate() {
  const length = parseInt(lengthRange.value);
  const useUppercase = uppercaseCheckbox.checked;
  const useLowercase = lowercaseCheckbox.checked;
  const useNumbers = numbersCheckbox.checked;
  const useSymbols = symbolsCheckbox.checked;

  const password = generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols);
  passwordText.textContent = password;

  updateStrength(length, useUppercase, useLowercase, useNumbers, useSymbols);
}

function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols) {
  let charset = '';
  if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumbers) charset += '0123456789';
  if (useSymbols) charset += '!@#$%^&*()_+{}[]|:;"<>,.?/';

  if (charset === '') {
    showAlert('Please select at least one character type.');
    return ''; 
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function refreshRangeValue() {
  lengthValue.textContent = lengthRange.value;
}

function showAlert(message) {
  var alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.style.cssText = 'position: fixed; top: 70%; left: 50%; transform: translate(-50%, -50%); padding: 15px; background-color: #A4FFAF; color: #18171F; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);';
  document.body.appendChild(alertBox);
  setTimeout(function() {
    alertBox.parentNode.removeChild(alertBox);
  }, 2000);
}

function copyToClipboard() {
  let textToCopy = document.getElementById('text-to-copy').innerText;
  navigator.clipboard.writeText(textToCopy).then(function() {
    showAlert('Text copied to clipboard');
  }, function(err) {
    showAlert('Error copying text to clipboard: ' + err);
  });
}

function updateStrength(length, useUppercase, useLowercase, useNumbers, useSymbols) {
  let strength = 0;
  if (length >= 10) strength++; 
  if (useUppercase) strength++; 
  if (useLowercase) strength++; 
  if (useNumbers) strength++;
  if (useSymbols) strength++; 

  if (strength < 2) {
    strengthWord.textContent = 'TOO WEAK!';
  } else if (strength < 3) {
    strengthWord.textContent = 'WEAK';
  } else if (strength < 4) {
    strengthWord.textContent = 'MEDIUM';
  } else {
    strengthWord.textContent = 'STRONG';
  }

  const barsCount = Math.min(strength, 4); 
  strengthBars.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.backgroundColor = i < barsCount ? getColorForStrength(strength) : '#24232C';
    strengthBars.appendChild(bar);
  }
}

function getColorForStrength(strength) {
  if (strength < 2) {
    return '#F64A4A'; 
  } else if (strength < 3) {
    return '#FB7C58';
  } else if (strength < 4) {
    return '#F8CD65'; 
  } else {
    return '#A4FFAF'; 
  }
}

