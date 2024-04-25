import { App, FunctionPlugin } from 'vue'
import Navbar from './navbar.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Navbar.name!, Navbar)
}

export { Navbar, install as default }
