<script setup>
import { useUsersStore } from "@/stores/users.js";
import { computed, ref } from "vue";

const userSearch = ref("");
const userStore = useUsersStore();

const filteredUser = computed(() => {
  return userStore.users.filter((user) => {
    return user.name.toLowerCase().includes(userSearch.value.toLowerCase());
  });
});
</script>

<template>
  <div class="container">
    <h1 class="heading">Exercise 3</h1>
    <div>
      <input
        v-model="userSearch"
        class="form__field"
        placeholder="Search user..."
      />
      <button>Search</button>
    </div>
    <table>
      <caption>
        User table
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="user in filteredUser" :key="user.id">
          <td
            v-for="(value, key) in {
              name: user.name,
              email: user.email,
              gender: user.gender,
              status: user.status,
            }"
            :key="key"
          >
            <span v-if="user.id !== userStore.initializeEditingState">{{
              value
            }}</span>
            <input
              class="edit__field"
              v-else
              v-model="userStore.createEditedUser[key]"
            />
          </td>
          <td>
            <button
              v-if="user.id !== userStore.initializeEditingState"
              @click="userStore.editUserData(user)"
            >
              Edit
            </button>
            <button v-else @click="userStore.updateUserData">Save</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  margin-top: 20px;
}

th,
td {
  border: 0.5px solid #dbdfe1;
  padding: 10px;
  text-align: center;
  font-weight: 600;
}

th {
  background-color: #f5f4f1;
}

caption {
  text-align: left;
  padding: 5px 0;
  font-size: 13px;
  font-weight: 600;
}

.form__field {
  padding: 10px;
  border-radius: 6px;
  border-color: rgb(207, 206, 206);
  border: 0.5px solid #dbdfe1;
  max-width: 700px;
  width: 100%;
  margin: 10px 0;
}

.edit__field {
  padding: 8px;
  border: 0.5px solid #dbdfe1;
  font-size: 14px;
  width: 100%;
  color: #3d3d3b;
}

button {
  background-color: #d4eaf7;
  padding: 10px;
  border-radius: 6px;
  border: 0.5px solid #f5f4f1;
  cursor: pointer;
  width: 100px;
  margin-left: 5px;
  transition: background-color 0.3s ease;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
}

button:hover {
  background-color: #e2f0f9;
}
</style>
