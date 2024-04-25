import { App, FunctionPlugin } from 'vue'
import Roll from './roll.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Roll.name!, Roll)
}

export { Roll, install as default }
