import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('token');
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.clearToken();
      this.user = null;
    },
    async fetchUser() {
      if (!this.token) return
      try {
        const res = await axios.get('http://localhost:3000/api/auth/protected', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.setUser(res.data.user)
      } catch {
        this.logout()
      }
    }
  },
});
