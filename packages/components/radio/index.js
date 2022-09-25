import radio from './radio.vue'

radio.install = app => {
    app.component(radio.name, radio)
}

export default radio
