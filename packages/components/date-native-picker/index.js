import DateNativePicker from './date-native-picker.vue'

DateNativePicker.install = app => {
	app.component(DateNativePicker.name, DateNativePicker)
}

export { DateNativePicker, DateNativePicker as default }
