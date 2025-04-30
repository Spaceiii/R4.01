<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" required />

      <label for="password">Mot de passe</label>
      <input v-model="password" type="password" id="password" required />

      <button type="submit">Se connecter</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref(null)

const router = useRouter()
const auth = useAuthStore()

async function handleLogin() {
  error.value = null
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value
    })
    auth.setToken(res.data.token)
    auth.setUser(res.data.user)
    router.push('/protected')
  } catch {
    error.value = 'Email ou mot de passe incorrect.'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input, button {
  display: block;
  width: 100%;
  margin: 1em 0;
  padding: 0.5em;
}
.error {
  color: red;
}
</style>
