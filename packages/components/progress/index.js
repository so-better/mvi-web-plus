import progress from './progress.vue'

progress.install = app => {
    app.component(progress.name, progress)
}

export default progress
