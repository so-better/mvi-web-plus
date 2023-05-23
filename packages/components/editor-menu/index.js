import EditorMenu from './editor-menu.vue'
import definedEditorMenus from './definedMenus'
EditorMenu.install = app => {
	app.component(EditorMenu.name, EditorMenu)
}

export { definedEditorMenus, EditorMenu, EditorMenu as default }
