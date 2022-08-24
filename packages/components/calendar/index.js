import calendar from './calendar.vue'

calendar.install = app => {
    app.component(calendar.name, calendar)
}

export default calendar
