import { App, FunctionPlugin } from 'vue'
import Picker from './picker.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Picker.name!, Picker)
}

export { Picker, install as default }
