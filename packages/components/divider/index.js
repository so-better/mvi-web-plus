import divider from './divider'

divider.install = app => {
    app.component(divider.name, divider)
}

export default divider
