import Triangle from './triangle.vue'

Triangle.install = app => {
    app.component(Triangle.name, Triangle)
}

export { Triangle, Triangle as default }
