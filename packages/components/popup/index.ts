import { App, FunctionPlugin } from 'vue'
import Popup from './popup.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Popup.name!, Popup)
}

export { Popup, install as default }
