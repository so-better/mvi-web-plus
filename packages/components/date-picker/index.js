import DatePicker from './date-picker.vue'

DatePicker.install = app => {
    app.component(DatePicker.name, DatePicker)
}

export { DatePicker, DatePicker as default }
