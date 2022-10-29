import SwipeCell from './swipe-cell.vue'

SwipeCell.install = app => {
    app.component(SwipeCell.name, SwipeCell)
}

export { SwipeCell, SwipeCell as default }
