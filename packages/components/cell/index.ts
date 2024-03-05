import { App } from 'vue'
import Cell from './cell.vue'

Cell.install = (app: App) => {
	app.component(Cell.name, Cell)
}

export { Cell, Cell as default }
