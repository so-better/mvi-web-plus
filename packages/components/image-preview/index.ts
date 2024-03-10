import ImagePreview from './image-preview.vue'

ImagePreview.install = app => {
	app.component(ImagePreview.name, ImagePreview)
}

export { ImagePreview, ImagePreview as default }
