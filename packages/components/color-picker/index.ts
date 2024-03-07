import { App } from 'vue'
import ColorPicker from './color-picker.vue'

ColorPicker.install = (app: App) => {
	app.component(ColorPicker.name, ColorPicker)
}

export { ColorPicker, ColorPicker as default }
