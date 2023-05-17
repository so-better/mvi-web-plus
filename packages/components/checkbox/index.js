import Checkbox from './checkbox.vue'

Checkbox.install = app => {
	app.component(Checkbox.name, Checkbox)
}

export { Checkbox, Checkbox as default }
