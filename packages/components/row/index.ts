import { App } from 'vue'
import Row from './row.vue'

Row.install = (app: App) => {
	app.component(Row.name!, Row)
}

export { Row, Row as default }
