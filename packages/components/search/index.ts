import { App, FunctionPlugin } from 'vue'
import Search from './search.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Search.name!, Search)
}

export { Search, install as default }
