import navbar from './navbar'

navbar.install = app => {
    app.component(navbar.name, navbar)
}

export default navbar
