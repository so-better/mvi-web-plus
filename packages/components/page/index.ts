import { App } from 'vue'
import Page from './page.vue'

Page.install = (app: App) => {
	app.component(Page.name!, Page)
}

export { Page, Page as default }
