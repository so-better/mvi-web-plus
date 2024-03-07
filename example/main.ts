import { createApp } from 'vue'
import App from './App.vue'
import mvi from '../packages'
const app = createApp(App)
app.config.globalProperties.dialogComponentWatch = function (eventName, type, el) {
	console.log(eventName, type, el, '触发了dialogComponentWatch')
}
app.use(mvi).mount('#app')
