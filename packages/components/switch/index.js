import switchComponent from './switch.vue'

switchComponent.install = app => {
    app.component(switchComponent.name, switchComponent)
}

export default switchComponent
