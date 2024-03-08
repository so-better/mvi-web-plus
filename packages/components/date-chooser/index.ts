import { App } from 'vue'
import DateChooser from './date-chooser.vue'

DateChooser.install = (app: App) => {
	app.component(DateChooser.name!, DateChooser)
}

export { DateChooser, DateChooser as default }
