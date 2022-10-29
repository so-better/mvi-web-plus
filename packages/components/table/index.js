import Table from './table.vue'

Table.install = app => {
    app.component(Table.name, Table)
}

export { Table, Table as default }
