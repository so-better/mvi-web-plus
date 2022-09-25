import loading from './loading.vue'

loading.install = app => {
    app.component(loading.name, loading)
}

export default loading
