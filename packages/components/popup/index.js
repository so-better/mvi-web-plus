import popup from './popup'

popup.install = app => {
    app.component(popup.name, popup)
}

export default popup
