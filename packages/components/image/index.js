import Image from './image.vue'

Image.install = app => {
	app.component(Image.name, Image)
}

export { Image, Image as default }
