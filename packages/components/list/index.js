import list from './list.vue'

list.install = app => {
    app.component(list.name, list)
}

export default list
