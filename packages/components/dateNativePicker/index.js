import dateNativePicker from './dateNativePicker.vue'

dateNativePicker.install = app => {
    app.component(dateNativePicker.name, dateNativePicker)
}

export default dateNativePicker
