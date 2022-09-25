import colorPicker from './colorPicker.vue'

colorPicker.install = app => {
    app.component(colorPicker.name, colorPicker)
}

export default colorPicker
