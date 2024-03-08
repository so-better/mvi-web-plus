import { App } from 'vue'
import SwiperSlide from './swiper-slide.vue'

SwiperSlide.install = (app: App) => {
	app.component(SwiperSlide.name, SwiperSlide)
}

export { SwiperSlide, SwiperSlide as default }
