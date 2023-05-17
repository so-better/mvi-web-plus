import CircleProgress from './circle-progress.vue'

CircleProgress.install = app => {
	app.component(CircleProgress.name, CircleProgress)
}

export { CircleProgress, CircleProgress as default }
