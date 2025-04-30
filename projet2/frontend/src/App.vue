<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/login">Connexion</router-link></li>
        <li><router-link to="/register">Inscription</router-link></li>
        <li><router-link to="/protected">Page Protégée</router-link></li>
      </ul>
    </nav>

    <!-- Routes -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

// Logic to handle the protection of the "protected" route
const auth = useAuthStore()
const router = useRouter()

// Si l'utilisateur essaie d'accéder à /protected sans être authentifié
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !auth.token) {
    next('/login') // Redirige vers la page de connexion
  } else {
    next() // Sinon, continue
  }
})
</script>

<style scoped>
.navbar {
  background-color: #333;
  color: white;
  padding: 1em;
}
.navbar ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.navbar li {
  margin: 0 1em;
}
.navbar a {
  color: white;
  text-decoration: none;
}
.navbar a:hover {
  text-decoration: underline;
}
</style>
