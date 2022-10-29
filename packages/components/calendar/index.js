import Calendar from './calendar.vue'

Calendar.install = app => {
    app.component(Calendar.name, Calendar)
}

export { Calendar, Calendar as default }
