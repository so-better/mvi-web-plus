import stepper from './stepper'

stepper.install = app => {
    app.component(stepper.name, stepper)
}

export default stepper
