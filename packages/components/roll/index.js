import roll from './roll'

roll.install = app => {
    app.component(roll.name, roll)
}

export default roll
