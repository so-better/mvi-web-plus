import { App } from 'vue'
import Tab from './tab.vue'

Tab.install = (app: App) => {
	app.component(Tab.name!, Tab)
}

export { Tab, Tab as default }
