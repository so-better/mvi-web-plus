import dateNativePicker from './dateNativePicker'

dateNativePicker.install = app => {
    app.component(dateNativePicker.name, dateNativePicker)
}

export default dateNativePicker
