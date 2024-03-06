import { App } from 'vue'
import DateNativePicker from './date-native-picker.vue'

DateNativePicker.install = (app: App) => {
	app.component(DateNativePicker.name, DateNativePicker)
}

export { DateNativePicker, DateNativePicker as default }
