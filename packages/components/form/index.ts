import { App, FunctionPlugin } from 'vue'
import Form from './form.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Form.name!, Form)
}

export { Form, install as default }
