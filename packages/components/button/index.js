import button from './button.vue'
button.install = app => {
    app.component(button.name, button)
}
export default button
