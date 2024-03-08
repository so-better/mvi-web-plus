import { App } from 'vue'
import Checkbox from './checkbox.vue'

Checkbox.install = (app: App) => {
	app.component(Checkbox.name!, Checkbox)
}

export { Checkbox, Checkbox as default }
