import Icon from './icon.vue'
Icon.install = app => {
	app.component(Icon.name, Icon)
}
export { Icon, Icon as default }
