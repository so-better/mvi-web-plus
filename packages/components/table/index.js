import table from './table.vue'

table.install = app => {
    app.component(table.name, table)
}

export default table
