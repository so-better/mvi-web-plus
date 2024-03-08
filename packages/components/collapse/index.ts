import { App } from 'vue'
import Collapse from './collapse.vue'

Collapse.install = (app: App) => {
	app.component(Collapse.name!, Collapse)
}

export { Collapse, Collapse as default }
