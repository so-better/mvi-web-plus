import SwiperSlide from './swiper-slide.vue'

SwiperSlide.install = app => {
    app.component(SwiperSlide.name, SwiperSlide)
}

export { SwiperSlide, SwiperSlide as default }
