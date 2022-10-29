import List from './list.vue'

List.install = app => {
    app.component(List.name, List)
}

export { List, List as default }
