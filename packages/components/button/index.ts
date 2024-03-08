import Button from './button.vue'
import { App } from 'vue'

Button.install = (app: App) => {
	app.component(Button.name!, Button)
}

export { Button, Button as default }
