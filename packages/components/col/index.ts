import { App, FunctionPlugin } from 'vue'
import Col from './col.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Col.name!, Col)
}

export { Col, install as default }
