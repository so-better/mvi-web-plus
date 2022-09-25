import overlay from './overlay.vue'

overlay.install = app => {
    app.component(overlay.name, overlay)
}

export default overlay
