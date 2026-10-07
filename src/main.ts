import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router/index.ts'
import AppLink from './components/AppLink.vue'


const app = createApp(App)
app.component('AppLink', AppLink)
app.use(router)

// mount after the initial navigation is ready
await router.isReady()

app.mount('#app')
