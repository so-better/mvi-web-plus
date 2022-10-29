import Layer from './layer.vue'

Layer.install = app => {
    app.component(Layer.name, Layer)
}

export { Layer, Layer as default }
