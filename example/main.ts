import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../lib/mvi-default.css'
import '../lib/mvi-support.css'
import mvi from '../lib/mvi.es'
const app = createApp(App)
app.config.globalProperties.dialogComponentWatch = function (eventName, type, el) {
	console.log(eventName, type, el)
}

app.use(router).use(mvi).mount('#app')
