import triangle from './triangle'

triangle.install = app => {
    app.component(triangle.name, triangle)
}

export default triangle
