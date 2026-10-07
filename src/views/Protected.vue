<template>
  <div>
    <h1>Greetings, {{ username }}</h1>
    <button @click="logout">Logout</button>
    <AppLink :to="{ name: 'invoices'}">
      <button>Invoices</button>
    </AppLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref((window as any).user)
const router = useRouter()

const logout = () => {
  (window as any).user = null
  router.push({ name: 'Home' })
}
</script>