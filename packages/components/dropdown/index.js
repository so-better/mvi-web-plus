import dropdown from './dropdown'

dropdown.install = app => {
    app.component(dropdown.name, dropdown)
}

export default dropdown
