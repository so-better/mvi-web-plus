import Actionsheet from './actionsheet.vue'
Actionsheet.install = app => {
    app.component(Actionsheet.name, Actionsheet)
}

export { Actionsheet, Actionsheet as default }
