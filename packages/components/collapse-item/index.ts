import { App } from 'vue'
import CollapseItem from './collapse-item.vue'

CollapseItem.install = (app: App) => {
	app.component(CollapseItem.name, CollapseItem)
}

export { CollapseItem, CollapseItem as default }
