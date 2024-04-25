import { App, FunctionPlugin } from 'vue'
import Slider from './slider.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Slider.name!, Slider)
}

export { Slider, install as default }
