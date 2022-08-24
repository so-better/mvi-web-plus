import image from './image.vue'

image.install = app => {
    app.component(image.name, image)
}

export default image
