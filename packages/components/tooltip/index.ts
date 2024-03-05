import { App } from 'vue'
import Tooltip from './tooltip.vue'

Tooltip.install = (app: App) => {
	app.component(Tooltip.name, Tooltip)
}

export { Tooltip, Tooltip as default }
