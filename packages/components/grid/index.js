import row from './row.vue'
import col from './col.vue'

row.install = app => {
    app.component(row.name, row)
    app.component(col.name, col)
}

export default row
