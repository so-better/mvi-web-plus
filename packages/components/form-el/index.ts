import { App } from 'vue'
import FormEl from './form-el.vue'

FormEl.install = (app: App) => {
	app.component(FormEl.name!, FormEl)
}

export { FormEl, FormEl as default }
