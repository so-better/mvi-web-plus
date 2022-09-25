import actionSheet from './actionsheet.vue'

actionSheet.install = app => {
    app.component(actionSheet.name, actionSheet)
}

export default actionSheet
