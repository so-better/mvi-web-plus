import { App, FunctionPlugin } from 'vue'
import RichImage from './rich-image.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(<string>RichImage.name, RichImage)
}

export { RichImage, install as default }
