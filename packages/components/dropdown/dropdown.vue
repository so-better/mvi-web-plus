<template>
	<Popup ref="popupRef" v-model="cmpShow" :overlay-color="overlayColor" :z-index="zIndex" :timeout="timeout" :placement="placement" :round="round" :use-padding="usePadding" :mount-el="mountEl" :closable="closable" :__contentPadding="false">
		<div class="mvi-dropdown">
			<div :disabled="itemDisabled(item) || null" class="mvi-dropdown-item" :class="dropdownItemClass(item, index)" v-for="(item, index) in options" @click="doSelect(item, index)" :style="dropdownItemStyle(item, index)">
				<div class="mvi-dropdown-label">
					<Icon v-if="item.icon" :type="parseIcon(item.icon).type" :url="parseIcon(item.icon).url" :spin="parseIcon(item.icon).spin" class="mvi-dropdown-label-icon" :size="parseIcon(item.icon).size" :color="parseIcon(item.icon).color" />
					<span class="mvi-dropdown-label-text" v-text="item.label || ''"></span>
				</div>
				<div class="mvi-dropdown-icon" :class="{ checked: equalValue(item, index) }" :data-placement="placement">
					<Icon :type="parseIcon(selectedIcon).type" :url="parseIcon(selectedIcon).url" :spin="parseIcon(selectedIcon).spin" :size="parseIcon(selectedIcon).size" :color="parseIcon(selectedIcon).color" />
				</div>
			</div>
		</div>
	</Popup>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import { Popup } from '../popup'

import { DropdownOptionsItemType, DropdownProps } from './props'
import { DefineComponent, computed, ref } from 'vue'
import { IconPropsType } from '../icon/props'

defineOptions({
	name: 'm-dropdown'
})

//属性
const props = defineProps(DropdownProps)

//事件
const emits = defineEmits(['update:modelValue', 'update:show', 'select'])

//popup组件实例
const popupRef = ref<DefineComponent | null>(null)

//导出的dom元素
const $$el = computed<HTMLElement>(() => {
	return popupRef.value!.$$el
})
const cmpShow = computed<boolean>({
	set(value) {
		emits('update:show', value)
	},
	get() {
		return props.show
	}
})
//转换图标字段
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
//判断是否选中项
const equalValue = computed<(item: DropdownOptionsItemType, index: number) => boolean>(() => {
	return (item: DropdownOptionsItemType, index: number): boolean => {
		if (item.value === undefined || item.value === null) {
			return props.modelValue === index
		}
		return Dap.common.equal(props.modelValue, item.value)
	}
})
//选项是否禁用
const itemDisabled = computed<(item: DropdownOptionsItemType) => boolean>(() => {
	return (item: DropdownOptionsItemType): boolean => {
		if (typeof item.disabled == 'boolean') {
			return item.disabled
		}
		return false
	}
})
//选项样式
const dropdownItemStyle = computed<(item: DropdownOptionsItemType, index: number) => any>(() => {
	return (item: DropdownOptionsItemType, index: number): any => {
		let style: any = {}
		if (!itemDisabled.value(item) && equalValue.value(item, index) && props.activeColor) {
			style.color = props.activeColor
		}
		return style
	}
})
//选项class
const dropdownItemClass = computed<(item: DropdownOptionsItemType, index: number) => string[]>(() => {
	return (item: DropdownOptionsItemType, index: number) => {
		let cls = []
		if (equalValue.value(item, index) && !item.disabled) {
			cls.push('checked')
		}
		if (props.active && !item.disabled) {
			cls.push('active')
		}
		return cls
	}
})

//选择
const doSelect = (item: DropdownOptionsItemType, index: number) => {
	if (item.disabled) {
		return
	}
	emits('select', JSON.parse(JSON.stringify(item)), index)
	if (!Dap.common.equal(item.value, props.modelValue)) {
		emits('update:modelValue', item.value)
	}
	if (props.selectedClose) {
		cmpShow.value = false
	}
}

defineExpose({
	$$el
})
</script>
<style scoped src="./dropdown.less"></style>
