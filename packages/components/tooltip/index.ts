import { App, FunctionPlugin } from 'vue'
import Tooltip from './tooltip.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Tooltip.name!, Tooltip)
}

export { Tooltip, install as default }
