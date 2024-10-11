<script setup>
import { ref } from 'vue'

const peselNumber = ref('')
const validateInputMessage = ref('')

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

  const storeWeightByPeselNumber = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
  const sum = peselNumber
    .slice(0, 10)
    .split('')
    .reduce((acc, num, index) => acc + parseInt(num, 10) * storeWeightByPeselNumber[index], 0)
  const calculatedControlNumber = (10 - (sum % 10)) % 10

  return calculatedControlNumber === controlNumber
}

const validatePeselInput = () => {
  const validInputMessage = 'The pesel number was entered correctly.'
  const invalidInputMessage = 'The pesel number was entered incorrectly.'

  validateInputMessage.value = isValidPeselNumber(peselNumber.value)
    ? validInputMessage
    : invalidInputMessage
}
</script>

<template>
  <div class="container">
    <h1 class="heading">Exercise 2</h1>
    <label>Enter your PESEL number:</label>
    <input v-model="peselNumber" placeholder="Enter your PESEL number" />
    <button @click="validatePeselInput">Check</button>
    <span v-if="validateInputMessage">{{ validateInputMessage }}</span>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 10px;
}

.heading {
  font-size: 20px;
}
</style>
