export function formatCurrency(value) {
  if (isNaN(+value)) throw new Error('Arg value must be a number')
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatAvatarLetters(name) {
  if (typeof name !== 'string') throw new Error('Arg name must be a string')
  const [firstName, lastName] = splitNameAndLastName(name)
  return (firstName[0] + lastName[0])
}

export function formatUsernameFirstName(name) {
  if (typeof name !== 'string') throw new Error('Arg name must be a string')
  const [firstName] = splitNameAndLastName(name)
  return firstName
}

function splitNameAndLastName(name) {
  const [firstName, lastName] = name.split(' ')
  return [firstName, lastName]
}