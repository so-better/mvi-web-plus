import { App, FunctionPlugin } from 'vue'
import DateChooser from './date-chooser.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(DateChooser.name!, DateChooser)
}

export { DateChooser, install as default }
