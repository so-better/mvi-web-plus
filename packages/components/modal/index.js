import modal from './modal'

modal.install = app => {
    app.component(modal.name, modal)
}

export default modal
