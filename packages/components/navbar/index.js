import Navbar from './navbar.vue'

Navbar.install = app => {
    app.component(Navbar.name, Navbar)
}

export { Navbar, Navbar as default }
