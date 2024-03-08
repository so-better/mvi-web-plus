<template>
	<Button :disabled="disabled || null" class="mvi-button" :class="btnClass">
		<slot name="loading" v-if="loading && $slots.loading"></slot>
		<template v-else-if="loading">
			<Icon :type="parseIcon(loadIcon).type" :color="parseIcon(loadIcon).color" :url="parseIcon(loadIcon).url" :spin="parseIcon(loadIcon).spin" :size="parseIcon(loadIcon).size" />
			<span class="mvi-button-load-text" v-if="loadText">{{ loadText }}</span>
		</template>
		<slot v-else></slot>
	</Button>
</template>
<script setup lang="ts">
import { h, computed, defineComponent, useSlots } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { ButtonProps } from './props'
import { IconPropsType } from '../icon/props'

defineOptions({
	name: 'm-button'
})

const props = defineProps(ButtonProps)

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
const btnClass = computed<string[]>(() => {
	let cls = []
	if (props.type) {
		cls.push(props.type)
	}
	if (props.size) {
		cls.push(props.size)
	}
	if (props.round) {
		cls.push('round')
	} else if (props.square) {
		cls.push('square')
	}
	if (props.block) {
		cls.push('block')
	}
	if (props.plain) {
		cls.push('plain')
	}
	if (props.active && !props.disabled) {
		cls.push('active')
	}
	if (props.loading) {
		cls.push('loading')
	}
	return cls
})

// 定义Button组件
const Button = defineComponent(() => {
	let attrs: any = {}
	if (props.tag.toLocaleUpperCase() == 'BUTTON') {
		attrs.type = props.nativeType
	}
	return () => {
		return h(props.tag, attrs, {
			default: useSlots().default
		})
	}
})
</script>
<style scoped src="./button.less"></style>
