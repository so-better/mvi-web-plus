import { App, FunctionPlugin } from 'vue'
import Page from './page.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Page.name!, Page)
}

export { Page, install as default }
