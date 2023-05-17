import Cell from './cell.vue'

Cell.install = app => {
	app.component(Cell.name, Cell)
}

export { Cell, Cell as default }
