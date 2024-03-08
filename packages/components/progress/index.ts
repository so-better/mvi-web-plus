import { App } from 'vue'
import Progress from './progress.vue'

Progress.install = (app: App) => {
	app.component(Progress.name!, Progress)
}

export { Progress, Progress as default }
