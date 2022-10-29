import Steps from './steps.vue'

Steps.install = app => {
    app.component(Steps.name, Steps)
}

export { Steps, Steps as default }
