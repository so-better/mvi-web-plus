import { App, FunctionPlugin } from 'vue'
import Tabbar from './tabbar.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Tabbar.name!, Tabbar)
}
export { Tabbar, install as default }
