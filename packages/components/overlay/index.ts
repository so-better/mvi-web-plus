import { App } from 'vue'
import Overlay from './overlay.vue'

Overlay.install = (app: App) => {
	app.component(Overlay.name, Overlay)
}

export { Overlay, Overlay as default }
