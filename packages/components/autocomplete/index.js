import autocomplete from './autocomplete.vue'

autocomplete.install = app => {
    app.component(autocomplete.name, autocomplete)
}

export default autocomplete
