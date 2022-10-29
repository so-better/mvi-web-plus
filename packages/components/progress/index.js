import Progress from './progress.vue'

Progress.install = app => {
    app.component(Progress.name, Progress)
}

export { Progress, Progress as default }
