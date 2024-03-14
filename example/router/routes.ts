export default [
	{
		path: '/',
		name: 'index',
		meta: {
			title: '测试-主页'
		},
		component: () => import('../test/Index.vue')
	}
]
