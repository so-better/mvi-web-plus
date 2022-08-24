import tooltip from './tooltip'

tooltip.install = app => {
    app.component(tooltip.name, tooltip)
}

export default tooltip
