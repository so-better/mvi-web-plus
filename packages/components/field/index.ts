import { App } from 'vue'
import Field from './field.vue'

Field.install = (app: App) => {
	app.component(Field.name!, Field)
}

export { Field, Field as default }
