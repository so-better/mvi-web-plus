import circleProgress from './circleProgress.vue'

circleProgress.install = app => {
    app.component(circleProgress.name, circleProgress)
}

export default circleProgress
