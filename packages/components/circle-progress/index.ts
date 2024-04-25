import { App, FunctionPlugin } from 'vue'
import CircleProgress from './circle-progress.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(CircleProgress.name!, CircleProgress)
}

export { CircleProgress, install as default }
