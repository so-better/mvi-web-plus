<template>
	<div class="mvi-collapse-item" :class="{ border: collapse!.props.outBorder }" :disabled="cmpDisabled || null">
		<Cell class="mvi-collapse-cell" :class="{ expand: expand }" :icon="icon" :content="label" :title="title" :border="<boolean>collapse!.props.inBorder" :arrow="{ type: 'angle-right', size: '0.8em' }" @click="changeCollapse" :active="cmpActive" :no-wrap="<boolean>collapse!.props.noWrap"></Cell>
		<TransitionSlide :expand="expand" :timeout="200" @before-slide-up="beforeSlideUp" @slide-up="slideUp" @before-slide-down="beforeSlideDown" @slide-down="slideDown">
			<div class="mvi-collapse-content">
				<slot v-if="$slots.default"></slot>
				<span v-else v-text="content"></span>
			</div>
		</TransitionSlide>
	</div>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, Ref, computed, getCurrentInstance, inject, onBeforeUnmount } from 'vue'
import Dap from 'dap-util'
import { Cell } from '@/components/cell'
import { TransitionSlide } from '@/components/transition-slide'
import { parentIsMatch } from '@/utils'
import { CollapseItemProps } from './props'

defineOptions({
	name: 'm-collapse-item'
})

//实例
const instance = getCurrentInstance()!

//获取Collapse组件实例
const collapse = inject<ComponentInternalInstance | null>('collapse', null)
const collapseItemChildren = inject<Ref<ComponentInternalInstance[]> | null>('collapseItemChildren', null)

parentIsMatch(collapseItemChildren, collapse, 'm-collapse', ['Collapse', 'CollapseItem'])

//加入到Collapse的children去
collapseItemChildren!.value.push(instance)

//属性
const props = defineProps(CollapseItemProps)

//面板的序列
const index = computed<number>(() => {
	return collapseItemChildren!.value.findIndex((vm: ComponentInternalInstance) => {
		return Dap.common.equal(vm.uid, instance.uid)
	})
})
//是否禁用
const cmpDisabled = computed<boolean>(() => {
	return !!(collapse!.props.disabled || props.disabled)
})
//点击态
const cmpActive = computed<boolean>(() => {
	if (cmpDisabled.value) {
		return false
	}
	return <boolean>collapse!.props.active
})
//是否展开
const expand = computed<boolean>(() => {
	let flag = false
	//手风琴模式
	if (collapse!.props.accordion) {
		if (collapse!.props.modelValue === index.value) {
			flag = true
		}
	}
	//非手风琴模式
	else {
		//值为数字
		if (Dap.number.isNumber(collapse!.props.modelValue)) {
			if (collapse!.props.modelValue === index.value) {
				flag = true
			}
		}
		//值为数组
		else if (Array.isArray(collapse!.props.modelValue)) {
			if (collapse!.props.modelValue.includes(index.value)) {
				flag = true
			}
		}
	}
	return flag
})

//面板展开前触发
const beforeSlideDown = () => {
	collapse!.emit('before-slide-down', index.value)
}
//面板展开后触发
const slideDown = () => {
	collapse!.emit('slide-down', index.value)
}
//面板收起前触发
const beforeSlideUp = () => {
	collapse!.emit('before-slide-up', index.value)
}
//面板收起后触发
const slideUp = () => {
	collapse!.emit('slide-up', index.value)
}
//点击collapse-item
const changeCollapse = () => {
	if (cmpDisabled.value) {
		return false
	}
	//手风琴模式
	if (collapse!.props.accordion) {
		//关闭当前面板
		if (collapse!.props.modelValue == index.value) {
			collapse!.emit('update:modelValue', null)
			collapse!.emit('change', null)
		}
		//打开面板
		else {
			collapse!.emit('update:modelValue', index.value)
			collapse!.emit('change', index.value)
		}
	}
	//非手风琴模式
	else {
		//值为数字
		if (Dap.number.isNumber(collapse!.props.modelValue)) {
			//关闭当前展开的面板
			if (collapse!.props.modelValue == index.value) {
				collapse!.emit('update:modelValue', [])
				collapse!.emit('change', [])
			}
			//打开面板
			else {
				collapse!.emit('update:modelValue', [collapse!.props.modelValue, index.value])
				collapse!.emit('change', [collapse!.props.modelValue, index.value])
			}
		}
		//值为数组
		else if (Array.isArray(collapse!.props.modelValue)) {
			let arr = [...collapse!.props.modelValue]
			//关闭当前面板
			if (arr.includes(index.value)) {
				arr = arr.filter(item => {
					return item != index.value
				})
				collapse!.emit('update:modelValue', arr)
				collapse!.emit('change', arr)
			}
			//打开面板
			else {
				arr.push(index.value)
				collapse!.emit('update:modelValue', arr)
				collapse!.emit('change', arr)
			}
		} else {
			let arr = [index.value]
			collapse!.emit('update:modelValue', arr)
			collapse!.emit('change', arr)
		}
	}
}

onBeforeUnmount(() => {
	collapseItemChildren!.value.splice(index.value, 1)
	if (<number>collapse!.props.modelValue > 0) {
		collapse!.emit('update:modelValue', <number>collapse!.props.modelValue - 1)
		collapse!.emit('change', <number>collapse!.props.modelValue - 1)
	}
})
</script>

<style scoped src="./collapse-item.less"></style>
