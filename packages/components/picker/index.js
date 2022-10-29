import Picker from './picker.vue'

Picker.install = app => {
    app.component(Picker.name, Picker)
}

export { Picker, Picker as default }
