import { App } from 'vue'
import Switch from './switch.vue'

Switch.install = (app: App) => {
	app.component(Switch.name, Switch)
}

export { Switch, Switch as default }
