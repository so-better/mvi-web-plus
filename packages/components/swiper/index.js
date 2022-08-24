import swiper from './swiper'
import swiperSlide from './swiper-slide'

swiper.install = app => {
    app.component(swiper.name, swiper)
    app.component(swiperSlide.name, swiperSlide)
}

export default swiper
