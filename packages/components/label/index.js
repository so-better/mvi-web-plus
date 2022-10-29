import Label from './label.vue'

Label.install = app => {
    app.component(Label.name, Label)
}

export { Label, Label as default }
