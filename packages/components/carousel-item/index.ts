import { App, FunctionPlugin } from 'vue'
import CarouselItem from './carousel-item.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(CarouselItem.name!, CarouselItem)
}

export { CarouselItem, install as default }
