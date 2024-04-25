import { App, FunctionPlugin } from 'vue'
import Tabs from './tabs.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Tabs.name!, Tabs)
}

export { Tabs, install as default }
