import Search from './search.vue'

Search.install = app => {
	app.component(Search.name, Search)
}

export { Search, Search as default }
