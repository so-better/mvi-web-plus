import input from './input'

input.install = app => {
    app.component(input.name, input)
}

export default input
