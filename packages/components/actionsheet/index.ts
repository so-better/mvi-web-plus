import { App } from 'vue'
import Actionsheet from './actionsheet.vue'

Actionsheet.install = (app: App) => {
	app.component(Actionsheet.name, Actionsheet)
}

export { Actionsheet, Actionsheet as default }
