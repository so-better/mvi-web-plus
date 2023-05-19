import EditorMenu from './editor-menu.vue'
import definedMenus from './definedMenus'
EditorMenu.install = app => {
	app.component(EditorMenu.name, EditorMenu)
}

export { definedMenus, EditorMenu, EditorMenu as default }
