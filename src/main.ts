import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router/index.ts'


const app = createApp(App)
app.use(router)

// mount after the initial navigation is ready
await router.isReady()

app.mount('#app')
