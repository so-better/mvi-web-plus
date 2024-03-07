import { App } from 'vue'
import Image from './image.vue'

Image.install = (app: App) => {
	app.component(Image.name, Image)
}

export { Image, Image as default }
