import { App } from 'vue'
import Popup from './popup.vue'

Popup.install = (app: App) => {
	app.component(Popup.name!, Popup)
}

export { Popup, Popup as default }
