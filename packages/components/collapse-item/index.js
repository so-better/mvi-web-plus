import CollapseItem from './collapse-item.vue'

CollapseItem.install = app => {
	app.component(CollapseItem.name, CollapseItem)
}

export { CollapseItem, CollapseItem as default }
