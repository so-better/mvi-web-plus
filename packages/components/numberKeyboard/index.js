import numberKeyboard from './numberKeyboard.vue'

numberKeyboard.install = app => {
    app.component(numberKeyboard.name, numberKeyboard)
}

export default numberKeyboard
