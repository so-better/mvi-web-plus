import Divider from './divider.vue'

Divider.install = app => {
    app.component(Divider.name, Divider)
}

export { Divider, Divider as default }
