import Switch from './switch.vue'

Switch.install = app => {
	app.component(Switch.name, Switch)
}

export { Switch, Switch as default }
