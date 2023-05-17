import Field from './field.vue'

Field.install = app => {
	app.component(Field.name, Field)
}

export { Field, Field as default }
