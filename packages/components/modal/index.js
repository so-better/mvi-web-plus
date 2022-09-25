import modal from './modal.vue'

modal.install = app => {
    app.component(modal.name, modal)
}

export default modal
