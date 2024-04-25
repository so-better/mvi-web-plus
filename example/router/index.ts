import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
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

//是否指令
const isDirective = (item: string) => {
	return ['Anchor', 'Drag', 'Observe', 'Prop', 'Px', 'Resize', 'Ripple', 'Scroll', 'Spy', 'Upload'].includes(item)
}

export const components = [
	'Anchor',
	'Drag',
	'Observe',
	'Prop',
	'Px',
	'Resize',
	'Ripple',
	'Scroll',
	'Spy',
	'Upload',
	'Icon',
	'Badge',
	'Button',
	'Triangle',
	'Layer',
	'Label',
	'Input',
	'Loading',
	'LoadingBar',
	'Msgbox',
	'Divider',
	'Cell',
	'CellGroup',
	'Checkbox',
	'Radio',
	'Sign',
	'Roll',
	'Row',
	'Col',
	'Autocomplete',
	'Overlay',
	'Popup',
	'Dropdown',
	'Tooltip',
	'TransitionSlide',
	'Switch',
	'Navbar',
	'Notify',
	'Actionsheet',
	'Calendar',
	'CircleProgress',
	'Collapse',
	'CollapseItem',
	'DateChooser',
	'DateNativePicker',
	'Picker',
	'Progress',
	'Slider',
	'DatePicker',
	'Field',
	'Form',
	'FormEl',
	'Image',
	'ColorPicker',
	'List',
	'Modal',
	'Page',
	'Search',
	'Select',
	'Skeleton',
	'Steps',
	'Step',
	'Stepper',
	'NumberKeyboard',
	'Toast',
	'PullRefresh',
	'Dialog',
	'SwipeCell',
	'Tabbar',
	'Table',
	'Tabs',
	'Tab',
	'Carousel',
	'CarouselItem',
	'RichImage',
	'ImagePreview'
]
components.forEach(item => {
	const route: RouteRecordRaw = {
		path: `/${item}`,
		name: item,
		component: () => import(/* @vite-ignore */ `../test/${isDirective(item) ? 'directives' : 'components'}/${item}.vue`),
		meta: {
			title: `测试 - ${item}`
		}
	}
	router.addRoute(route)
})

router.afterEach(to => {
	document.title = <string>to.meta.title
	document.querySelector('.body')!.scrollTop = 0
})

export default router
