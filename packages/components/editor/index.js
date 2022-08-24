import editor from './editor'

editor.install = app => {
    app.component(editor.name, editor)
}

export default editor
