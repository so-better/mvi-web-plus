import picker from './picker'

picker.install = app => {
    app.component(picker.name, picker)
}

export default picker
