import datePicker from './datePicker.vue'

datePicker.install = app => {
    app.component(datePicker.name, datePicker)
}

export default datePicker
