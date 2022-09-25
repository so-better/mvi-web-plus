import steps from './steps.vue'
import step from './step.vue'

steps.install = app => {
    app.component(steps.name, steps)
    app.component(step.name, step)
}

export default steps
