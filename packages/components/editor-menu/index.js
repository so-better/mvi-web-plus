import EditorMenu from './editor-menu.vue'
import EditorDefinedMenuConfig from './definedMenus'
EditorMenu.install = app => {
	app.component(EditorMenu.name, EditorMenu)
}

export { EditorDefinedMenuConfig, EditorMenu, EditorMenu as default }
