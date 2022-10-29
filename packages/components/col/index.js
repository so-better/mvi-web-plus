import Col from './col.vue'

Col.install = app => {
    app.component(Col.name, Col)
}

export { Col, Col as default }
