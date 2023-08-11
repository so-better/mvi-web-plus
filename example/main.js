import { createApp } from 'vue'
import App from './App.vue'
import mvi from '../packages'
import RemFit from 'rem-fit'
const remFit = new RemFit(20, true)
remFit.init()
const app = createApp(App)
app.use(mvi).mount('#app')
