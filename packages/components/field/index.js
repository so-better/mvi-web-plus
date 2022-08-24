import field from './field'

field.install = app => {
    app.component(field.name, field)
}

export default field
