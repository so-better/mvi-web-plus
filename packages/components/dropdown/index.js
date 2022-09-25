import dropdown from './dropdown.vue'

dropdown.install = app => {
    app.component(dropdown.name, dropdown)
}

export default dropdown
