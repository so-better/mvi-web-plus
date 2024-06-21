import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../lib/support.css'
import '../lib/default.css'
import mvi from '../packages'
const app = createApp(App)
app.config.globalProperties.dialogComponentWatch = function (eventName, type, el) {
	console.log(eventName, type, el)
}

app.use(router).use(mvi).mount('#app')
