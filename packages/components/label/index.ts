import { App, FunctionPlugin } from 'vue'
import Label from './label.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Label.name!, Label)
}

export { Label, install as default }
