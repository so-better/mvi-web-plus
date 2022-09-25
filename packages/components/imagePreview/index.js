import imagePreview from './imagePreview.vue'

imagePreview.install = app => {
    app.component(imagePreview.name, imagePreview)
}

export default imagePreview
