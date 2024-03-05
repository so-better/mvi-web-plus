import { App } from 'vue'
import Navbar from './navbar.vue'

Navbar.install = (app: App) => {
	app.component(Navbar.name, Navbar)
}

export { Navbar, Navbar as default }
