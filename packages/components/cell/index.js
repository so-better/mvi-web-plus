import cell from './cell.vue'
import cellGroup from './cell-group.vue'

cell.install = app => {
    app.component(cellGroup.name, cellGroup)
    app.component(cell.name, cell)
}

export default cell
