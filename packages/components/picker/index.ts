import { App } from 'vue'
import Picker from './picker.vue'

Picker.install = (app: App) => {
	app.component(Picker.name, Picker)
}

export { Picker, Picker as default }
