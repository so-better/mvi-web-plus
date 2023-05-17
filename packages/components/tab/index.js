import Tab from './tab.vue'

Tab.install = app => {
	app.component(Tab.name, Tab)
}

export { Tab, Tab as default }
