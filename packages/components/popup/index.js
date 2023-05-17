import Popup from './popup.vue'

Popup.install = app => {
	app.component(Popup.name, Popup)
}

export { Popup, Popup as default }
