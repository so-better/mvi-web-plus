import Collapse from './collapse.vue'

Collapse.install = app => {
	app.component(Collapse.name, Collapse)
}

export { Collapse, Collapse as default }
