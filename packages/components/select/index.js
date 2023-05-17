import Select from './select.vue'
Select.install = app => {
	app.component(Select.name, Select)
}

export { Select, Select as default }
