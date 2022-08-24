import layer from './layer'

layer.install = app => {
    app.component(layer.name, layer)
}

export default layer
