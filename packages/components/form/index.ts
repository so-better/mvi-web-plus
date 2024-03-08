import { App } from 'vue'
import Form from './form.vue'

Form.install = (app: App) => {
	app.component(Form.name!, Form)
}

export { Form, Form as default }
