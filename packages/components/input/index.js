import input from './input.vue'

input.install = app => {
    app.component(input.name, input)
}

export default input
