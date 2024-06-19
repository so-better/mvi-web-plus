<template>
	<div class="mvi-cell" :class="{ border: cmpBorder, active: cmpActive }">
		<div class="mvi-cell-item">
			<Icon class="mvi-cell-icon" v-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type" :url="parseIcon(icon).url" :spin="parseIcon(icon).spin" :size="parseIcon(icon).size" :color="parseIcon(icon).color" />
			<div class="mvi-cell-title" :class="{ nowrap: noWrap }">
				<slot name="title" v-if="$slots.title"></slot>
				<span v-else v-text="title"></span>
			</div>
			<div class="mvi-cell-content" :class="{ nowrap: noWrap }" v-if="$slots.content || content">
				<slot name="content" v-if="$slots.content"></slot>
				<span v-else-if="content" v-text="content"></span>
			</div>
			<Icon class="mvi-cell-arrow" v-if="parseIcon(arrow).type || parseIcon(arrow).url" :type="parseIcon(arrow).type" :url="parseIcon(arrow).url" :spin="parseIcon(arrow).spin" :size="parseIcon(arrow).size" :color="parseIcon(arrow).color" />
		</div>
		<div class="mvi-cell-label" v-if="label || $slots.label" :style="labelTextStyle">
			<slot name="label" v-if="$slots.label"></slot>
			<span v-text="label" v-else-if="label"></span>
		</div>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { ComponentInternalInstance, computed, inject } from 'vue'
import { Icon, IconPropsType } from '@/components/icon'
import { CellProps } from './props'

defineOptions({
	name: 'm-cell'
})

//CellGroup组件
const cellGroup = inject<ComponentInternalInstance | null>('cellGroup', null)

//属性
const props = defineProps(CellProps)

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
const cmpActive = computed<boolean>(() => {
	if (typeof props.active == 'boolean') {
		return props.active
	}
	if (cellGroup && cellGroup.type.name == 'm-cell-group' && typeof cellGroup.props.active == 'boolean') {
		return cellGroup.props.active
	}
	return true
})
const cmpBorder = computed<boolean>(() => {
	if (typeof props.border == 'boolean') {
		return props.border
	}
	if (cellGroup && cellGroup.type.name == 'm-cell-group' && typeof cellGroup.props.border == 'boolean') {
		return cellGroup.props.border
	}
	return false
})
const labelTextStyle = computed<any>(() => {
	let style: any = {}
	//如果ellipsis不是false
	if (props.ellipsis) {
		style.display = '-webkit-box'
		style.textOverflow = 'ellipsis'
		style.webkitBoxOrient = 'vertical'
		style.overflow = 'hidden'
		if (typeof props.ellipsis == 'boolean') {
			style.webkitLineClamp = 3
		} else {
			style.webkitLineClamp = props.ellipsis
		}
	}
	return style
})
</script>
<style scoped src="./cell.less"></style>
