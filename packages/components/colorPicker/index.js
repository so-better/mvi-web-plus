import colorPicker from './colorPicker'

colorPicker.install = app => {
    app.component(colorPicker.name, colorPicker)
}

export default colorPicker
