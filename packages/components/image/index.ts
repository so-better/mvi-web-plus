import { App, FunctionPlugin } from 'vue'
import Image from './image.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Image.name!, Image)
}

export { Image, install as default }
