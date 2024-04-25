import { App, FunctionPlugin } from 'vue'
import Collapse from './collapse.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Collapse.name!, Collapse)
}

export { Collapse, install as default }
