import navbar from './navbar.vue'

navbar.install = app => {
    app.component(navbar.name, navbar)
}

export default navbar
