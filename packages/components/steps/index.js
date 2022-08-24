import steps from './steps'
import step from './step'

steps.install = app => {
    app.component(steps.name, steps)
    app.component(step.name, step)
}

export default steps
