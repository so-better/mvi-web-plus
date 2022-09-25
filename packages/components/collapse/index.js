import collapse from './collapse.vue'
import collapseItem from './collapse-item.vue'

collapse.install = app => {
    app.component(collapse.name, collapse)
    app.component(collapseItem.name, collapseItem)
}

export default collapse
