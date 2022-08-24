import radio from './radio'

radio.install = app => {
    app.component(radio.name, radio)
}

export default radio
