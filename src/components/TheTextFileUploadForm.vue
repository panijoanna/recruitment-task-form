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
  <div class="container">
    <h1 class="heading">Exercise 1</h1>
    <p>Upload a text file:</p>
    <input type="file" @change="handleTextFileUpload" accept=".txt, .rtf" class="form__field" />
    <p>File Content:</p>
    <div v-if="fileText" class="file__content--container">
      {{ fileText }}
    </div>
  </div>
</template>

<style>
.container {
  margin: 50px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.heading {
  font-size: 20px;
  font-weight: 700;
  color: #313d44;
  padding-bottom: 10px;
}

.file__content--container {
  max-width: 700px;
  color: #615f5f;
}
</style>
