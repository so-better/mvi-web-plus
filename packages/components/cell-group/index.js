import CellGroup from './cell-group.vue'

CellGroup.install = app => {
    app.component(CellGroup.name, CellGroup)
}

export { CellGroup, CellGroup as default }
