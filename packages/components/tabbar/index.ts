import { App } from 'vue'
import Tabbar from './tabbar.vue'

Tabbar.install = (app: App) => {
	app.component(Tabbar.name, Tabbar)
}
export { Tabbar, Tabbar as default }
