import popup from './popup.vue'

popup.install = app => {
    app.component(popup.name, popup)
}

export default popup
