import { App } from 'vue'
import Stepper from './stepper.vue'

Stepper.install = (app: App) => {
	app.component(Stepper.name, Stepper)
}

export { Stepper, Stepper as default }
