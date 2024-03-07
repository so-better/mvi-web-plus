import { App } from 'vue'
import Select from './select.vue'

Select.install = (app: App) => {
	app.component(Select.name, Select)
}

export { Select, Select as default }
