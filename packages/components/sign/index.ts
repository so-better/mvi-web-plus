import { App, FunctionPlugin } from 'vue'
import Sign from './sign.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Sign.name!, Sign)
}

export { Sign, install as default }
