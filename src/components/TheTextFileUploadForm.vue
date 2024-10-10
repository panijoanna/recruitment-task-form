<script setup>
import { ref } from 'vue'
const fileText = ref('')

const handleTextFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const textContent = e.target.result
      fileText.value = shuffleText(textContent)
    }

    reader.readAsText(file)
  }
}

const shuffleText = (textContent) =>
  textContent[0] +
  textContent
    .slice(1, -1)
    .match(/[a-zA-ZąęłńóśźżĄĘŁŃÓŚŹŻ0-9,.!?;:() ]/g)
    .sort(() => 0.5 - Math.random())
    .join('') +
  textContent[textContent.length - 1]
</script>

<template>
  <div>
    <h1 class="heading">Exercise 1</h1>
    <form class="form" @submit.prevent="processFile">
      <label class="form__header">Upload a text file</label>
      <input type="file" @change="handleTextFileUpload" accept=".txt, .rtf" />
      <p>File Content:</p>
      <div v-if="fileText">
        {{ fileText }}
      </div>
    </form>
  </div>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.heading {
  font-size: 20px;
  font-weight: 700;
  color: rgb(86, 86, 210);
}

.form__header {
  font-weight: 600;
}
</style>
