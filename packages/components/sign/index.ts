import { App } from 'vue'
import Sign from './sign.vue'

Sign.install = (app: App) => {
	app.component(Sign.name, Sign)
}

export { Sign, Sign as default }
