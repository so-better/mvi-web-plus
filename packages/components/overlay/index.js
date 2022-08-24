import overlay from './overlay'

overlay.install = app => {
    app.component(overlay.name, overlay)
}

export default overlay
