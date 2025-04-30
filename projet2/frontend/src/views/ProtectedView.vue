<template>
  <div class="protected">
    <h2>Bienvenue, visiteur authentifié 🌸</h2>
    <p>Ton email : {{ user?.email }}</p>
    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const user = ref(null)
const router = useRouter()

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/auth/protected', {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    user.value = res.data.user
  } catch {
    auth.logout()
    router.push('/login')
  }
})

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.protected {
  text-align: center;
  padding: 2em;
}
button {
  margin-top: 1em;
  padding: 0.5em 1em;
}
</style>
