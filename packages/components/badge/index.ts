import { App, FunctionPlugin } from 'vue'
import Badge from './badge.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Badge.name!, Badge)
}

export { Badge, install as default }
