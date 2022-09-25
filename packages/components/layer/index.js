import layer from './layer.vue'

layer.install = app => {
    app.component(layer.name, layer)
}

export default layer
