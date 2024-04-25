import { App, FunctionPlugin } from 'vue'
import Carousel from './carousel.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Carousel.name!, Carousel)
}

export { Carousel, install as default }
