import { format } from 'date-fns';

export function formatCurrency(value) {
  if (isNaN(+value)) return value
  return Number(value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatCurrencyInput(newValue, oldValue) {
  const [sign, splitValue] = newValue.split('R$')
  if (!splitValue) return oldValue
  const dotReplacedValue = splitValue.replace(',', '.')
  if (isNaN(+dotReplacedValue)) return oldValue
  const commaReplacedValue = splitValue.replace('.', ',')
  return `R$ ${commaReplacedValue.trim()}`
}

export function formatCurrencyToCents(value) {
  const [sign, splittedValue] = value.split('R$')
  const replacedValue = splittedValue.replace(',', '.')
  if (isNaN(+replacedValue)) return value
  return Math.round(replacedValue * 100)
}

export function formatAvatarLetters(name) {
  if (name.length < 2 || typeof name !== 'string') return name

  const nameArray = splitNameAndLastName(name)
  const splittedName = name.split('')
  if (nameArray.length < 2) {
    return (splittedName[0] + splittedName[1])
  }

  const [firstName, lastName] = nameArray
  return (firstName[0] + lastName[0])
}

export function formatUsernameFirstName(name) {
  const [firstName] = splitNameAndLastName(name)
  return firstName
}

function splitNameAndLastName(name) {
  const nameArray = name.split(' ')
  return nameArray
}

export function formatPhoneNumber(num) {
  let format = "xx x xxxx xxxx";
  let numbers = String(num);

  for (const number of numbers) {
    format = format.replace('x', number)
  }
  return format
}

export function formatCpfNumber(num) {
  let format = "xxx xxx xxx xx";
  let numbers = String(num);

  for (const number of numbers) {
    format = format.replace('x', number)
  }
  return format
}

export function formatTotalNumber(total) {
  if (isNaN(total)) {
    total = 0;
  }
  return Number(total).toLocaleString('pt-BR', { minimumIntegerDigits: 2 })
}

export function formatDate(date, pattern) {
  return format(new Date(date), pattern);
}