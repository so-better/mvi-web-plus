import tabs from './tabs.vue'
import tab from './tab.vue'
tabs.install = app => {
    app.component(tabs.name, tabs)
    app.component(tab.name, tab)
}

export default tabs
