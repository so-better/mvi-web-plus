import Swiper from './swiper.vue'

Swiper.install = app => {
    app.component(Swiper.name, Swiper)
}

export { Swiper, Swiper as default }
