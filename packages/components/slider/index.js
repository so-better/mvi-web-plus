import slider from './slider'

slider.install = app => {
    app.component(slider.name, slider)
}

export default slider
