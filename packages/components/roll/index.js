import roll from './roll.vue'

roll.install = app => {
    app.component(roll.name, roll)
}

export default roll
