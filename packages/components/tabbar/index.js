import Tabbar from './tabbar.vue'

Tabbar.install = app => {
    app.component(Tabbar.name, Tabbar)
}
export { Tabbar, Tabbar as default }
