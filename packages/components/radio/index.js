import Radio from './radio.vue'

Radio.install = app => {
	app.component(Radio.name, Radio)
}

export { Radio, Radio as default }
