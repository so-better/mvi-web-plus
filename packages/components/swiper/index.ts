import { App } from 'vue'
import Swiper from './swiper.vue'

Swiper.install = (app: App) => {
	app.component(Swiper.name, Swiper)
}

export { Swiper, Swiper as default }
