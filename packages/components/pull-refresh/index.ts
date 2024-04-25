import { App, FunctionPlugin } from 'vue'
import PullRefresh from './pull-refresh.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(PullRefresh.name!, PullRefresh)
}

export { PullRefresh, install as default }
