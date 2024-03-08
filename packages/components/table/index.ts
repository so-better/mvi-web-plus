import { App } from 'vue'
import Table from './table.vue'

Table.install = (app: App) => {
	app.component(Table.name, Table)
}

export { Table, Table as default }
