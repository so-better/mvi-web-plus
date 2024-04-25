import { App, FunctionPlugin } from 'vue'
import DateNativePicker from './date-native-picker.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(DateNativePicker.name!, DateNativePicker)
}

export { DateNativePicker, install as default }
