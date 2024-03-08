import { App } from 'vue'
import PullRefresh from './pull-refresh.vue'

PullRefresh.install = (app: App) => {
	app.component(PullRefresh.name!, PullRefresh)
}

export { PullRefresh, PullRefresh as default }
