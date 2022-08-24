import progress from './progress'

progress.install = app => {
    app.component(progress.name, progress)
}

export default progress
