import badge from './badge'

badge.install = app => {
    app.component(badge.name, badge)
}

export default badge
