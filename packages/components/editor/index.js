import Editor from './editor.vue'
import { AlexElement } from 'alex-editor'
Editor.install = app => {
	app.component(Editor.name, Editor)
}

export { AlexElement, Editor, Editor as default }
