import Step from './step.vue'

Step.install = app => {
	app.component(Step.name, Step)
}

export { Step, Step as default }
