import swiper from './swiper.vue'
import swiperSlide from './swiper-slide.vue'

swiper.install = app => {
    app.component(swiper.name, swiper)
    app.component(swiperSlide.name, swiperSlide)
}

export default swiper
