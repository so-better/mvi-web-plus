import { App, FunctionPlugin } from 'vue'
import Icon from './icon.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Icon.name!, Icon)
}
export { Icon, install as default }
