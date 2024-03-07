import { App } from 'vue'
import Modal from './modal.vue'

Modal.install = (app: App) => {
	app.component(Modal.name, Modal)
}

export { Modal, Modal as default }
