import { App } from 'vue'
import List from './list.vue'

List.install = (app: App) => {
	app.component(List.name!, List)
}

export { List, List as default }
