import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const createEditedUser = ref({})
  const initializeEditingState = ref(null)
  const apiKey = import.meta.env.VITE_API_KEY

  const editUserData = (user) => {
    createEditedUser.value = { ...user }
    initializeEditingState.value = user.id
  }

  const loadUserData = async () => {
    try {
      const response = await axios.get('https://gorest.co.in/public/v2/users')
      users.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateUserData = async () => {
    try {
      const response = await axios.put(
        `https://gorest.co.in/public/v2/users/${createEditedUser.value.id}`,
        createEditedUser.value,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        }
      )
      const updatedUser = response.data
      initializeEditingState.value = updatedUser
      const userIndex = users.value.findIndex((user) => user.id === updatedUser.id)
      users.value[userIndex] = updatedUser
    } catch (error) {
      console.error(error)
    }
  }

  loadUserData()

  return {
    users,
    updateUserData,
    createEditedUser,
    initializeEditingState,
    editUserData,
    loadUserData
  }
})
