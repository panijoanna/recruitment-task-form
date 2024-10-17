<script setup>
import { isValidPeselNumber } from "@/utils/isValidPeselNumber";
import { ref } from "vue";
const peselNumber = ref("");
const validateInputMessage = ref("");

const validatePeselInput = () => {
  validateInputMessage.value = isValidPeselNumber(peselNumber.value);
};

const checkForm = (e) => {
  e.preventDefault();
  peselNumber.value = "";
};
</script>

<template>
  <div class="container">
    <h1 class="heading">Exercise 2</h1>
    <form @submit.prevent="checkForm" class="psesel__form">
      <label for="peselNumber" class="label">Enter your PESEL number:</label>
      <input
        v-model="peselNumber"
        placeholder="Enter your PESEL number..."
        class="form__field"
        id="peselNumber"
        type="text"
        maxlength="11"
        minlength="11"
      />
      <span
        :class="validateInputMessage ? 'valid__message' : 'invalid__message'"
        v-if="validateInputMessage !== ''"
        >{{
          validateInputMessage
            ? "The pesel number was entered correctly."
            : "The pesel number was entered incorrectly."
        }}</span
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
