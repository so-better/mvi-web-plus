import checkbox from './checkbox.vue'

checkbox.install = app => {
    app.component(checkbox.name, checkbox)
}

export default checkbox
