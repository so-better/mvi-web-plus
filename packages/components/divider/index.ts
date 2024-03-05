import { App } from 'vue'
import Divider from './divider.vue'

Divider.install = (app: App) => {
	app.component(Divider.name, Divider)
}

export { Divider, Divider as default }
