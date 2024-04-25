import { App, FunctionPlugin } from 'vue'
import Table from './table.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Table.name!, Table)
}

export { Table, install as default }
