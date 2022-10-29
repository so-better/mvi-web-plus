import Badge from './badge.vue'

Badge.install = app => {
    app.component(Badge.name, Badge)
}

export { Badge, Badge as default }
