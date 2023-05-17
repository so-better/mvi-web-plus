import Overlay from './overlay.vue'

Overlay.install = app => {
	app.component(Overlay.name, Overlay)
}

export { Overlay, Overlay as default }
