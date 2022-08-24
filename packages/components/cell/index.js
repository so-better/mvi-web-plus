import cell from './cell'
import cellGroup from './cell-group'

cell.install = app => {
    app.component(cellGroup.name, cellGroup)
    app.component(cell.name, cell)
}

export default cell
