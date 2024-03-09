import { App } from 'vue'
import CarouselItem from './carousel-item.vue'

CarouselItem.install = (app: App) => {
	app.component(CarouselItem.name!, CarouselItem)
}

export { CarouselItem, CarouselItem as default }
