import EditorMenus from './editor-menus.vue'

EditorMenus.install = app => {
	app.component(EditorMenus.name, EditorMenus)
}

export { EditorMenus, EditorMenus as default }
