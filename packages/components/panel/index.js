import panel from './panel'

panel.install = app => {
    app.component(panel.name, panel)
}

export default panel
