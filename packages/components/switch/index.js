import switchComponent from './switch'

switchComponent.install = app => {
    app.component(switchComponent.name, switchComponent)
}

export default switchComponent
