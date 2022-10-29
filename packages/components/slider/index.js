import Slider from './slider.vue'

Slider.install = app => {
    app.component(Slider.name, Slider)
}

export { Slider, Slider as default }
