import { App, FunctionPlugin } from 'vue'
import Switch from './switch.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Switch.name!, Switch)
}

export { Switch, install as default }
