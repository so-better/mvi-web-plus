import loading from './loading'

loading.install = app => {
    app.component(loading.name, loading)
}

export default loading
