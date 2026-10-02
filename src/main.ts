import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router/index.ts'


createApp(App)
.use(router)
.mount('#app')
