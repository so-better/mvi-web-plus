import actionSheet from './actionsheet'

actionSheet.install = app => {
    app.component(actionSheet.name, actionSheet)
}

export default actionSheet
