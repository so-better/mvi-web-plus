import { App } from 'vue'
import Tabs from './tabs.vue'
Tabs.install = (app: App) => {
	app.component(Tabs.name!, Tabs)
}

export { Tabs, Tabs as default }
