import { App } from 'vue'
import Autocomplete from './autocomplete.vue'

Autocomplete.install = (app: App) => {
	app.component(Autocomplete.name!, Autocomplete)
}

export { Autocomplete, Autocomplete as default }
