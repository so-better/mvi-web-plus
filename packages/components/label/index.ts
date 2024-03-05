import Label from './label.vue'
import { App } from 'vue'

Label.install = (app: App) => {
	app.component(Label.name, Label)
}

export { Label, Label as default }
