import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mvi from '../packages'
const app = createApp(App)
app.use(router).use(mvi).mount('#app')
