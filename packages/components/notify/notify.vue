<template>
	<teleport to="body">
		<transition name="mvi-notify" @after-leave="afterLeave" @after-enter="afterEnter">
			<div v-show="show" class="mvi-notify" :class="[cmpType]" :style="notifyStyle">
				<div class="mvi-notify-content">
					<Icon v-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type" :url="parseIcon(icon).url" :spin="parseIcon(icon).spin" :size="parseIcon(icon).size" :color="parseIcon(icon).color" />
					<span v-text="cmpMessage"></span>
				</div>
			</div>
		</transition>
	</teleport>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { Icon, IconPropsType } from '@/components/icon'
import { NotifyProps } from './props'

defineOptions({
	name: 'm-notify'
})

//实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(NotifyProps)

//计时器
const timer = ref<any>(null)
//是否显示
const show = ref<boolean>(false)

//类型
const cmpType = computed<string>(() => {
	let arr: string[] = ['success', 'info', 'primary', 'error', 'warn']
	if (arr.includes(props.type)) {
		return props.type
	}
	return 'success'
})
//消息文本
const cmpMessage = computed<string>(() => {
	if (typeof props.message == 'string') {
		return props.message
	}
	if (Dap.common.isObject(props.message)) {
		return JSON.stringify(props.message)
	}
	return String(props.message)
})
//自定义文字颜色
const cmpColor = computed<string | null>(() => {
	if (typeof props.color == 'string') {
		return props.color
	}
	return null
})
//自定义背景色
const cmpBackground = computed<string | null>(() => {
	if (typeof props.background == 'string') {
		return props.background
	}
	return null
})
//自定义zIndex
const cmpZIndex = computed<number>(() => {
	if (Dap.number.isNumber(props.zIndex)) {
		return props.zIndex
	}
	return 1100
})
//自动关闭时间
const cmpTimeout = computed<number>(() => {
	if (Dap.number.isNumber(props.timeout)) {
		return props.timeout
	}
	return 1500
})
//转换图标
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
//通知样式
const notifyStyle = computed<any>(() => {
	let style: any = {
		zIndex: cmpZIndex.value
	}
	if (cmpBackground.value) {
		style.backgroundColor = cmpBackground.value
	}
	if (cmpColor.value) {
		style.color = cmpColor.value
	}
	return style
})

//清除计时器
const clearTimer = () => {
	if (timer.value) {
		clearTimeout(timer.value)
		timer.value = null
	}
}
//完全显示后
const afterEnter = () => {
	if (cmpTimeout.value > 0) {
		timer.value = setTimeout(() => {
			show.value = false
		}, cmpTimeout.value)
	}
}
//完全隐藏后
const afterLeave = () => {
	clearTimer()
	props.__remove()
}

onMounted(() => {
	show.value = true
	props.__init(instance)
})

defineExpose({
	show
})
</script>
<style scoped src="./notify.less"></style>
