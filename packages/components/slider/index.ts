import { App } from 'vue'
import Slider from './slider.vue'

Slider.install = (app: App) => {
	app.component(Slider.name, Slider)
}

export { Slider, Slider as default }
