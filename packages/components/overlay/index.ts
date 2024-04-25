import { App, FunctionPlugin } from 'vue'
import Overlay from './overlay.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Overlay.name!, Overlay)
}

export { Overlay, install as default }
