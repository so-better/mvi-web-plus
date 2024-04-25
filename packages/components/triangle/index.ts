import { App, FunctionPlugin } from 'vue'
import Triangle from './triangle.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Triangle.name!, Triangle)
}
export { Triangle, install as default }
