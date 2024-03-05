import Badge from './badge.vue'
import { App } from 'vue'

Badge.install = (app: App) => {
	app.component(Badge.name, Badge)
}

export { Badge, Badge as default }
