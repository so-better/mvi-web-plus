<script setup name="m-tabbar-item" lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import { Badge } from '../badge'
import { TabbarItemProps, TabbarRouteType } from './props'
import { ComponentInternalInstance, computed, getCurrentInstance, inject } from 'vue'
import { IconPropsType } from '../icon/props'

//获取实例
const instance = getCurrentInstance()!

//tabbar组件实例
const tabbar = inject<ComponentInternalInstance>('tabbar')!

//属性
const props = defineProps(TabbarItemProps)

const parseIcon = computed<(params: string | IconPropsType) => IconPropsType>(() => {
	return (params: string | IconPropsType) => {
		let icon: IconPropsType = {
			spin: false,
			type: '',
			url: '',
			color: '',
			size: ''
		}
		if (Dap.common.isObject(params)) {
			if (typeof (<IconPropsType>params).spin == 'boolean') {
				icon.spin = (<IconPropsType>params).spin
			}
			if (typeof (<IconPropsType>params).type == 'string') {
				icon.type = (<IconPropsType>params).type
			}
			if (typeof (<IconPropsType>params).url == 'string') {
				icon.url = (<IconPropsType>params).url
			}
			if (typeof (<IconPropsType>params).color == 'string') {
				icon.color = (<IconPropsType>params).color
			}
			if (typeof (<IconPropsType>params).size == 'string') {
				icon.size = (<IconPropsType>params).size
			}
		} else if (typeof params == 'string') {
			icon.type = params
		}
		return icon
	}
})
const cmpClass = computed<string[]>(() => {
	let cls: string[] = []
	if (Dap.common.equal(props.value, tabbar.props.modelValue)) {
		cls.push('item-active')
	}
	if (tabbar.props.active && !props.disabled && !Dap.common.equal(props.value, tabbar.props.modelValue)) {
		cls.push('active')
	}
	return cls
})
const cmpStyle = computed<any>(() => {
	let style: any = {}
	//激活
	if (Dap.common.equal(props.value, tabbar.props.modelValue)) {
		if (tabbar.props.activeColor) {
			style.color = tabbar.props.activeColor
		}
	} else {
		if (tabbar.props.inactiveColor) {
			style.color = tabbar.props.inactiveColor
		}
	}
	return style
})
const cmpRoute = computed<TabbarRouteType | null>(() => {
	if (!props.route) {
		return null
	}
	let route: TabbarRouteType = {}
	if (typeof props.route == 'string') {
		route = {
			path: props.route
		}
	} else if (Dap.common.isObject(props.route)) {
		//路径
		if (typeof props.route.path == 'string' && props.route.path) {
			route.path = props.route.path
		}
		//路由名称
		if (typeof props.route.name == 'string' && props.route.name) {
			route.name = props.route.name
		}
		//路由参数
		if (Dap.common.isObject(props.route.query)) {
			route.query = props.route.query
		} else {
			route.query = {}
		}
		//动态路由参数
		if (Dap.common.isObject(props.route.params)) {
			route.params = props.route.params
		} else {
			route.params = {}
		}
		//是否使用replace
		if (typeof props.route.replace == 'boolean') {
			route.replace = props.route.replace
		} else {
			route.replace = false
		}
	}
	if (!route.query) {
		route.query = {}
	}
	if (!route.params) {
		route.params = {}
	}
	return route
})

const setActive = () => {
	//触发item-click事件
	tabbar.emit('item-click', JSON.parse(JSON.stringify(props)))

	if (props.disabled) {
		return
	}
	if (Dap.common.equal(tabbar.props.modelValue, props.value)) {
		return
	}
	//如果路由存在
	if (cmpRoute.value && instance.appContext.config.globalProperties.$router && instance.appContext.config.globalProperties.$router.replace && instance.appContext.config.globalProperties.$router.push) {
		//path存在首先使用path
		if (cmpRoute.value.path) {
			if (cmpRoute.value.replace) {
				instance.appContext.config.globalProperties.$router.replace({
					path: cmpRoute.value.path,
					query: cmpRoute.value.query,
					params: cmpRoute.value.params
				})
			} else {
				instance.appContext.config.globalProperties.$router.push({
					path: cmpRoute.value.path,
					query: cmpRoute.value.query,
					params: cmpRoute.value.params
				})
			}
		}
		//使用路由名称
		else if (cmpRoute.value.name) {
			if (cmpRoute.value.replace) {
				instance.appContext.config.globalProperties.$router.replace({
					name: cmpRoute.value.name,
					query: cmpRoute.value.query,
					params: cmpRoute.value.params
				})
			} else {
				instance.appContext.config.globalProperties.$router.push({
					name: cmpRoute.value.name,
					query: cmpRoute.value.query,
					params: cmpRoute.value.params
				})
			}
		}
	}
	tabbar.emit('update:modelValue', props.value)
	tabbar.emit('change', JSON.parse(JSON.stringify(props)))
}
</script>

<template>
	<div :disabled="disabled || null" class="mvi-tabbar-item" :class="cmpClass" :style="cmpStyle" @click="setActive">
		<Badge :show="badge?.show" class="mvi-tabbar-badge" :content="badge?.content" :background="badge?.background" :color="badge?.color" :dot="badge?.dot" :placement="badge?.placement" :offset="badge?.offset">
			<div class="mvi-tabbar-item-child">
				<span class="mvi-tabbar-icon" v-if="parseIcon(icon).type || parseIcon(icon).url" :style="{ marginBottom: name ? '' : '0px' }">
					<Icon :type="parseIcon(icon).type" :url="parseIcon(icon).url" :spin="parseIcon(icon).spin" :size="parseIcon(icon).size" :color="parseIcon(icon).color" />
				</span>
				<span class="mvi-tabbar-name" :class="{ small: parseIcon(icon).type || parseIcon(icon).url }" v-text="name"></span>
			</div>
		</Badge>
	</div>
</template>

<style scoped src="./tabbar-item.less"></style>
