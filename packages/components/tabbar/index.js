import tabbar from './tabbar.vue'
tabbar.install = app => {
    app.component(tabbar.name, tabbar)
}
export default tabbar
