import picker from './picker.vue'

picker.install = app => {
    app.component(picker.name, picker)
}

export default picker
