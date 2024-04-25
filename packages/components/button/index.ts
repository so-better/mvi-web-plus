import { App, FunctionPlugin } from 'vue'
import Button from './button.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Button.name!, Button)
}

export { Button, install as default }
