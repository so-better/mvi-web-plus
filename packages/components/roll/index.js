import Roll from './roll.vue'

Roll.install = app => {
	app.component(Roll.name, Roll)
}

export { Roll, Roll as default }
