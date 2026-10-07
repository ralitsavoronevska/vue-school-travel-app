<template>
  <div class="login">
    <form class="form" @submit.prevent="login">
      <h1>Login</h1>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" v-model="username" />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="password" />
      <button class="btn">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()

const login = () => {
  // Auth user against API
  ;(window as any).user = username.value

  const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/protected'
  router.push(redirectPath)
}
</script>