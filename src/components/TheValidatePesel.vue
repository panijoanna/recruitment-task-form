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

const checkForm = (e) => {
  e.preventDefault()
  peselNumber.value = ''
}
</script>

<template>
  <div class="container">
    <h1 class="heading">Exercise 2</h1>
    <form @submit.prevent="checkForm" class="psesel__form">
      <label for="peselNumber" class="label">Enter your PESEL number:</label>
      <input
        v-model="peselNumber"
        placeholder="Enter your PESEL number"
        class="form__field"
        id="peselNumber"
        type="text"
        maxlength="11"
        minlength="11"
      />
      <span
        :class="
          validateInputMessage === 'The pesel number was entered correctly.'
            ? 'valid__message'
            : 'invalid__message'
        "
        v-if="validateInputMessage"
        >{{ validateInputMessage }}</span
      >
      <button @click="validatePeselInput">Check</button>
    </form>
  </div>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.invalid__message {
  padding: 0;
  color: rgb(203, 30, 30);
}

.valid__message {
  padding: 0;
  color: #32974f;
}
</style>
