import triangle from './triangle.vue'

triangle.install = app => {
    app.component(triangle.name, triangle)
}

export default triangle
