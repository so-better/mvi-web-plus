import ColorPicker from './color-picker.vue'

ColorPicker.install = app => {
	app.component(ColorPicker.name, ColorPicker)
}

export { ColorPicker, ColorPicker as default }
