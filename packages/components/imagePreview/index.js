import imagePreview from './imagePreview'

imagePreview.install = app => {
    app.component(imagePreview.name, imagePreview)
}

export default imagePreview
