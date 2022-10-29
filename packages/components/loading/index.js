import Loading from './loading.vue'

Loading.install = app => {
    app.component(Loading.name, Loading)
}

export { Loading, Loading as default }
