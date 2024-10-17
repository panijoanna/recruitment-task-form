import { it, describe, expect } from 'vitest'

const STORE_WEIGHT_BY_PESEL_NUMBER = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]

const isValidPeselNumber = (peselNumber) => {
  let year = parseInt(peselNumber.slice(0, 2), 10)
  let month = parseInt(peselNumber.slice(2, 4), 10)
  let day = parseInt(peselNumber.slice(4, 6), 10)
  let genderNumber = parseInt(peselNumber[9], 10)
  let controlNumber = parseInt(peselNumber[10], 10)

  if (peselNumber.length !== 11) return false

  let birthYear
  switch (true) {
    case month >= 1 && month <= 12:
      birthYear = 1900 + year
      break
    case month >= 21 && month <= 32:
      birthYear = 2000 + year
      month -= 20
      break
    case month >= 81 && month <= 92:
      birthYear = 1800 + year
      month -= 80
      break
    default:
      return false
  }

  const date = new Date(birthYear, month - 1, day)
  if (date.getFullYear() !== birthYear || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return false
  }

  genderNumber > 9 || genderNumber < 0 ? false : null

  const sum = peselNumber
    .slice(0, 10)
    .split('')
    .reduce((acc, num, index) => acc + parseInt(num, 10) * STORE_WEIGHT_BY_PESEL_NUMBER[index], 0)
  const calculatedControlNumber = (10 - (sum % 10)) % 10

  return calculatedControlNumber === controlNumber
}

describe('isValidPeselNumber function', () => {
  it('should return true for a valid PESEL', () => {
    const pesel = '64042999928'
    expect(isValidPeselNumber(pesel)).toBe(true)
  })

  it('should return false if the date is incorrect', () => {
    const pesel = '52023114478'
    expect(isValidPeselNumber(pesel)).toBe(false)
  })

  it('should return false if the gender code is invalid', () => {
    const pesel = '44051401959'
    expect(isValidPeselNumber(pesel)).toBe(false)
  })

  it('should return false if the PESEL is too short', () => {
    const pesel = '7745639'
    expect(isValidPeselNumber(pesel)).toBe(false)
  })

  it('should return false if the PESEL is too long', () => {
    const pesel = '800424487747'
    expect(isValidPeselNumber(pesel)).toBe(false)
  })

  it('should return false if the control number is invalid', () => {
    const pesel = '97031003023'
    expect(isValidPeselNumber(pesel)).toBe(false)
  })
})
