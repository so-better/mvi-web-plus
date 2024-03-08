import { App } from 'vue'
import SwipeCell from './swipe-cell.vue'

SwipeCell.install = (app: App) => {
	app.component(SwipeCell.name!, SwipeCell)
}

export { SwipeCell, SwipeCell as default }
