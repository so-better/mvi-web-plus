import { App, FunctionPlugin } from 'vue'
import Loading from './loading.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Loading.name!, Loading)
}
export { Loading, install as default }
