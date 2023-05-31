import { createApp } from 'vue'
import App from './App.vue'
import mvi from '../packages'
// import RemFit from 'rem-fit'
// const remFit = new RemFit(7.5, true)
// remFit.init()
createApp(App).use(mvi).mount('#app')
