import { App, FunctionPlugin } from 'vue'
import List from './list.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(List.name!, List)
}

export { List, install as default }
