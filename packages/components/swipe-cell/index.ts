import { App, FunctionPlugin } from 'vue'
import SwipeCell from './swipe-cell.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(SwipeCell.name!, SwipeCell)
}

export { SwipeCell, install as default }
