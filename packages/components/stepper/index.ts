import { App, FunctionPlugin } from 'vue'
import Stepper from './stepper.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Stepper.name!, Stepper)
}

export { Stepper, install as default }
