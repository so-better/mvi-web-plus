import { App, FunctionPlugin } from 'vue'
import Divider from './divider.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Divider.name!, Divider)
}

export { Divider, install as default }
