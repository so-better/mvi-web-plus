import { App, FunctionPlugin } from 'vue'
import Tab from './tab.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Tab.name!, Tab)
}

export { Tab, install as default }
