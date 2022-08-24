import datePicker from './datePicker'

datePicker.install = app => {
    app.component(datePicker.name, datePicker)
}

export default datePicker
