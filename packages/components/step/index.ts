import { App, FunctionPlugin } from 'vue'
import Step from './step.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Step.name!, Step)
}

export { Step, install as default }
