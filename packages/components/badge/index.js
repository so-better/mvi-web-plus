import badge from './badge.vue'

badge.install = app => {
    app.component(badge.name, badge)
}

export default badge
