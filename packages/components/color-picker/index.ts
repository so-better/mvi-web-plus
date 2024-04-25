import { App, FunctionPlugin } from 'vue'
import ColorPicker from './color-picker.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(ColorPicker.name!, ColorPicker)
}

export { ColorPicker, install as default }
