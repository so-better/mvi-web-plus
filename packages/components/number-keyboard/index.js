import NumberKeyboard from './number-keyboard.vue'

NumberKeyboard.install = app => {
	app.component(NumberKeyboard.name, NumberKeyboard)
}

export { NumberKeyboard, NumberKeyboard as default }
