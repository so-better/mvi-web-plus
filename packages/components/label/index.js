import label from './label'

label.install = app => {
    app.component(label.name, label)
}

export default label
