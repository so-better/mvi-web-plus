import search from './search'

search.install = app => {
    app.component(search.name, search)
}

export default search
