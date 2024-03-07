import { App } from 'vue'
import Step from './step.vue'

Step.install = (app: App) => {
	app.component(Step.name, Step)
}

export { Step, Step as default }
