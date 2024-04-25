import { App, FunctionPlugin } from 'vue'
import Autocomplete from './autocomplete.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Autocomplete.name!, Autocomplete)
}

export { Autocomplete, install as default }
