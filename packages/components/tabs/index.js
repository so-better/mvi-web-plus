import Tabs from './tabs.vue'
Tabs.install = app => {
	app.component(Tabs.name, Tabs)
}

export { Tabs, Tabs as default }
