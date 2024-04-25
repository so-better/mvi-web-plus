import { App, FunctionPlugin } from 'vue'
import ImagePreview from './image-preview.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(ImagePreview.name!, ImagePreview)
}

export { ImagePreview, install as default }
