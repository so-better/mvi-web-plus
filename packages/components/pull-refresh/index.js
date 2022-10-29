import PullRefresh from './pull-refresh.vue'

PullRefresh.install = app => {
    app.component(PullRefresh.name, PullRefresh)
}

export { PullRefresh, PullRefresh as default }
