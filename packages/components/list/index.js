import list from './list'

list.install = app => {
    app.component(list.name, list)
}

export default list
