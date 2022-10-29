import Tooltip from './tooltip.vue'

Tooltip.install = app => {
    app.component(Tooltip.name, Tooltip)
}

export { Tooltip, Tooltip as default }
