import Triangle from './triangle.vue'
import { App } from 'vue'

Triangle.install = (app: App) => {
	app.component(Triangle.name!, Triangle)
}
export { Triangle, Triangle as default }
