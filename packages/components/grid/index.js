import row from './row'
import col from './col'

row.install = app => {
    app.component(row.name, row)
    app.component(col.name, col)
}

export default row
