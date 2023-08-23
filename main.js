const inputEl = document.querySelector('#password')
const upperCaseCheckEl = document.querySelector('#uppercase-check')
const NumberCheckEl = document.querySelector('#number-check')
const symbolCheckEl = document.querySelector('#symbol-check')
const securityIndicatorBarEl = document.querySelector('#security-indicator-bar')

let passwordLength = 16

function generatePassword() {
  let chars = 'abcdefghijklmnopqrstuvwyz'

  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWYZ'
  const numberChars = '123456789'
  const symbolChars = '?!@&*()[]'

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars
  }

  if (NumberCheckEl.checked) {
    chars += numberChars
  }

  if (symbolCheckEl.checked) {
    chars += symbolChars
  }

  let password = ''

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }

  inputEl.value = password
  calculateQuality()
  calculeteFontSize()
}

function calculateQuality() {
  const percent = Math.round(
    (passwordLength / 64) * 100 * 0.25 +
      (upperCaseCheckEl.checked ? 15 : 0) +
      (NumberCheckEl.checked ? 25 : 0) +
      (symbolCheckEl.checked ? 35 : 0)
  )

  securityIndicatorBarEl.style.width = `${percent}%`

  if (percent > 69) {
    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.add('safe')
  } else if (percent > 50) {
    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.add('warning')
    securityIndicatorBarEl.classList.remove('safe')
  } else {
    securityIndicatorBarEl.classList.add('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.remove('safe')
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add('completed')
  } else {
    securityIndicatorBarEl.classList.remove('completed')
  }
}

function calculeteFontSize() {
  if (passwordLength > 45) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.add('font-xxs')
  } else if (passwordLength > 32) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.add('font-xs')
    inputEl.classList.remove('font-xxs')
  } else if (passwordLength > 22) {
    inputEl.classList.add('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.remove('font-xxs')
  } else {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.remove('font-xxs')
  }
}

function copy() {
  navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector('#password-length')
passwordLengthEl.addEventListener('input', () => {
  passwordLength = passwordLengthEl.value
  document.querySelector('#password-length-text').innerText = passwordLength
  generatePassword()
})
upperCaseCheckEl.addEventListener('click', generatePassword)
NumberCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)

document.querySelector('#copy-1').addEventListener('click', copy)
document.querySelector('#copy-2').addEventListener('click', copy)
document.querySelector('#renew').addEventListener('click', generatePassword)

generatePassword()
