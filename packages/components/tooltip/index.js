import tooltip from './tooltip.vue'

tooltip.install = app => {
    app.component(tooltip.name, tooltip)
}

export default tooltip
