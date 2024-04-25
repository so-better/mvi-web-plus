import { App, FunctionPlugin } from 'vue'
import Row from './row.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Row.name!, Row)
}

export { Row, install as default }
