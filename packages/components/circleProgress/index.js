import circleProgress from './circleProgress'

circleProgress.install = app => {
    app.component(circleProgress.name, circleProgress)
}

export default circleProgress
