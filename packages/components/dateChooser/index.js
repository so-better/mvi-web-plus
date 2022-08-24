import dateChooser from './dateChooser'

dateChooser.install = app => {
    app.component(dateChooser.name, dateChooser)
}

export default dateChooser
