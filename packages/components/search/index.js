import search from './search.vue'

search.install = app => {
    app.component(search.name, search)
}

export default search
