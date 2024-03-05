import { App } from 'vue'
import CellGroup from './cell-group.vue'

CellGroup.install = (app: App) => {
	app.component(CellGroup.name, CellGroup)
}

export { CellGroup, CellGroup as default }
