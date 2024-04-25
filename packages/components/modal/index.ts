import { App, FunctionPlugin } from 'vue'
import Modal from './modal.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Modal.name!, Modal)
}

export { Modal, install as default }
