import { App, FunctionPlugin } from 'vue'
import Cell from './cell.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Cell.name!, Cell)
}

export { Cell, install as default }
