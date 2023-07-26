export function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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