import { App } from 'vue'
import form from './form.vue'

form.install = (app: App) => {
	app.component(form.name, form)
}

export { form as Form, form as default }
