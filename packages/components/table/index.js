import table from './table'

table.install = app => {
    app.component(table.name, table)
}

export default table
