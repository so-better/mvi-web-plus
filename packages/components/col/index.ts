import { App } from 'vue'
import Col from './col.vue'

Col.install = (app: App) => {
	app.component(Col.name, Col)
}

export { Col, Col as default }
