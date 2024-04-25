import { App, FunctionPlugin } from 'vue'
import Actionsheet from './actionsheet.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Actionsheet.name!, Actionsheet)
}

export { Actionsheet, install as default }
