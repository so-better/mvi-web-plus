import Stepper from './stepper.vue'

Stepper.install = app => {
    app.component(Stepper.name, Stepper)
}

export { Stepper, Stepper as default }
