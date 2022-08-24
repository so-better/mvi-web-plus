import collapse from './collapse'
import collapseItem from './collapse-item'

collapse.install = app => {
    app.component(collapse.name, collapse)
    app.component(collapseItem.name, collapseItem)
}

export default collapse
