import { App } from 'vue'
import ImagePreview from './image-preview.vue'

ImagePreview.install = (app: App) => {
	app.component(<string>ImagePreview.name, ImagePreview)
}

export { ImagePreview, ImagePreview as default }
