import Editor from './editor.vue'

Editor.install = app => {
    app.component(Editor.name, Editor)
}

export { Editor, Editor as default }
