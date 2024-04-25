import { App, FunctionPlugin } from 'vue'
import Steps from './steps.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Steps.name!, Steps)
}

export { Steps, install as default }
