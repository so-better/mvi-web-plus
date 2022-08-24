import tabs from './tabs'
import tab from './tab'
tabs.install = app => {
    app.component(tabs.name, tabs)
    app.component(tab.name, tab)
}

export default tabs
