import pullRefresh from './pullRefresh'

pullRefresh.install = app => {
    app.component(pullRefresh.name, pullRefresh)
}

export default pullRefresh
