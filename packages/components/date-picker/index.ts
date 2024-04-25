import { App, FunctionPlugin } from 'vue'
import DatePicker from './date-picker.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(DatePicker.name!, DatePicker)
}

export { DatePicker, install as default }
