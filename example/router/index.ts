import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { components } from '../../packages'
const router = createRouter({
	history: createWebHashHistory('/'),
	routes: [
		{
			path: '/',
			name: 'index',
			meta: {
				title: 'mvi-web-plus'
			},
			component: () => import('../test/Index.vue')
		}
	]
})

//判断是否vue组件
const isVueComponent = (item: any) => {
	return typeof item.render == 'function' || typeof item.setup == 'function'
}

for (let key in components) {
	const route: RouteRecordRaw = {
		path: `/${key}`,
		name: key,
		component: () => import(/* @vite-ignore */ `../test/${isVueComponent(components[key]) ? 'components' : 'directives'}/${key}.vue`)
	}
	router.addRoute(route)
}

export default router
