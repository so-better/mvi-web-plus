import Autocomplete from './autocomplete.vue'

Autocomplete.install = app => {
    app.component(Autocomplete.name, Autocomplete)
}

export { Autocomplete, Autocomplete as default }
