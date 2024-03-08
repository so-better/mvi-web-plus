import { App } from 'vue'
import Roll from './roll.vue'

Roll.install = (app: App) => {
	app.component(Roll.name!, Roll)
}

export { Roll, Roll as default }
