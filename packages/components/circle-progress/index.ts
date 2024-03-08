import { App } from 'vue'
import CircleProgress from './circle-progress.vue'

CircleProgress.install = (app: App) => {
	app.component(CircleProgress.name!, CircleProgress)
}

export { CircleProgress, CircleProgress as default }
