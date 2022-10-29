import Row from './row.vue'

Row.install = app => {
    app.component(Row.name, Row)
}

export { Row, Row as default }
