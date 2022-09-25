import dateChooser from './dateChooser.vue'

dateChooser.install = app => {
    app.component(dateChooser.name, dateChooser)
}

export default dateChooser
