import { App, FunctionPlugin } from 'vue'
import CellGroup from './cell-group.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(CellGroup.name!, CellGroup)
}

export { CellGroup, install as default }
