import { App } from 'vue'
import Carousel from './carousel.vue'

Carousel.install = (app: App) => {
	app.component(Carousel.name!, Carousel)
}

export { Carousel, Carousel as default }
