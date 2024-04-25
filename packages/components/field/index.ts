import { App, FunctionPlugin } from 'vue'
import Field from './field.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Field.name!, Field)
}

export { Field, install as default }
