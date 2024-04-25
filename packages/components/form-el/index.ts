import { App, FunctionPlugin } from 'vue'
import FormEl from './form-el.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(FormEl.name!, FormEl)
}

export { FormEl, install as default }
