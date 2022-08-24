import numberKeyboard from './numberKeyboard'

numberKeyboard.install = app => {
    app.component(numberKeyboard.name, numberKeyboard)
}

export default numberKeyboard
