import field from './field.vue'

field.install = app => {
    app.component(field.name, field)
}

export default field
