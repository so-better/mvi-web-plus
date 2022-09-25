import editor from './editor.vue'

editor.install = app => {
    app.component(editor.name, editor)
}

export default editor
