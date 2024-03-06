import { App } from 'vue'
import Calendar from './calendar.vue'

Calendar.install = (app: App) => {
	app.component(Calendar.name, Calendar)
}

export { Calendar, Calendar as default }
