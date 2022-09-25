import stepper from './stepper.vue'

stepper.install = app => {
    app.component(stepper.name, stepper)
}

export default stepper
