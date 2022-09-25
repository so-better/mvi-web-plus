import panel from './panel.vue'

panel.install = app => {
    app.component(panel.name, panel)
}

export default panel
