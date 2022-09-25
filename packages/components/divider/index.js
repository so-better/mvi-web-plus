import divider from './divider.vue'

divider.install = app => {
    app.component(divider.name, divider)
}

export default divider
