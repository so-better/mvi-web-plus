import autocomplete from './autocomplete'

autocomplete.install = app => {
    app.component(autocomplete.name, autocomplete)
}

export default autocomplete
