import { App } from 'vue'
import RichImage from './rich-image.vue'

RichImage.install = (app: App) => {
	app.component(<string>RichImage.name, RichImage)
}

export { RichImage, RichImage as default }
