import tabbar from './tabbar'
tabbar.install = app => {
    app.component(tabbar.name, tabbar)
}
export default tabbar
