import { createApp } from 'vue'
import App from './App.vue'
import mvi from '../packages'
const app = createApp(App)
app.use(mvi).mount('#app')
