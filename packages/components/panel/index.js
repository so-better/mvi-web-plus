import Panel from './panel.vue'

Panel.install = app => {
    app.component(Panel.name, Panel)
}

export { Panel, Panel as default }
