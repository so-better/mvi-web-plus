import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { components } from '../../packages'
const router = createRouter({
	history: createWebHashHistory('/'),
	routes: [
		{
			path: '/',
			name: 'index',
			meta: {
				title: '测试 - mvi-web-plus'
			},
			component: () => import('../test/Index.vue')
		}
	]
})

//判断是否vue组件
const isVueComponent = (item: any) => {
	return typeof item.render == 'function' || typeof item.setup == 'function' || typeof item.initParams == 'function'
}

for (let key in components) {
	const route: RouteRecordRaw = {
		path: `/${key}`,
		name: key,
		component: () => import(/* @vite-ignore */ `../test/${isVueComponent(components[key]) ? 'components' : 'directives'}/${key}.vue`),
		meta: {
			title: `测试 - ${key}`
		}
	}
	router.addRoute(route)
}

router.afterEach(to => {
	document.title = <string>to.meta.title
	document.querySelector('.body')!.scrollTop = 0
})

export default router
