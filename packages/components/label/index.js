import label from './label.vue'

label.install = app => {
    app.component(label.name, label)
}

export default label
