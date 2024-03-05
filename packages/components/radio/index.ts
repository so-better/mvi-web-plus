import { App } from 'vue'
import Radio from './radio.vue'

Radio.install = (app: App) => {
	app.component(Radio.name, Radio)
}

export { Radio, Radio as default }
