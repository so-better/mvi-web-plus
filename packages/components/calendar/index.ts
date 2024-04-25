import { App, FunctionPlugin } from 'vue'
import Calendar from './calendar.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Calendar.name!, Calendar)
}

export { Calendar, install as default }
