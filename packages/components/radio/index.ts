import { App, FunctionPlugin } from 'vue'
import Radio from './radio.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Radio.name!, Radio)
}

export { Radio, install as default }
