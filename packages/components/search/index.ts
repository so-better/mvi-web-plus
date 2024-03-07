import { App } from 'vue'
import Search from './search.vue'

Search.install = (app: App) => {
	app.component(Search.name, Search)
}

export { Search, Search as default }
