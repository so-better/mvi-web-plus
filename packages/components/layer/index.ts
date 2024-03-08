import Layer from './layer.vue'
import { App } from 'vue'

Layer.install = (app: App) => {
	app.component(Layer.name!, Layer)
}

export { Layer, Layer as default }
