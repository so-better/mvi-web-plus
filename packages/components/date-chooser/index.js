import DateChooser from './date-chooser.vue'

DateChooser.install = app => {
	app.component(DateChooser.name, DateChooser)
}

export { DateChooser, DateChooser as default }
