import { App, FunctionPlugin } from 'vue'
import Layer from './layer.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Layer.name!, Layer)
}

export { Layer, install as default }
