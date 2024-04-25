import { App, FunctionPlugin } from 'vue'
import Progress from './progress.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Progress.name!, Progress)
}

export { Progress, install as default }
