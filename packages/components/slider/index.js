import slider from './slider.vue'

slider.install = app => {
    app.component(slider.name, slider)
}

export default slider
