import { App, FunctionPlugin } from 'vue'
import CollapseItem from './collapse-item.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(CollapseItem.name!, CollapseItem)
}

export { CollapseItem, install as default }
