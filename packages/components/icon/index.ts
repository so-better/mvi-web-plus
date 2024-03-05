import Icon from './icon.vue'
import { App } from 'vue'

Icon.install = (app: App) => {
	app.component(Icon.name, Icon)
}
export { Icon, Icon as default }
