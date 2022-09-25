import pullRefresh from './pullRefresh.vue'

pullRefresh.install = app => {
    app.component(pullRefresh.name, pullRefresh)
}

export default pullRefresh
