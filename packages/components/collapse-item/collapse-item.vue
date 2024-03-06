<script setup name="m-collapse-item" lang="ts">
import { ComponentInternalInstance, computed, getCurrentInstance } from 'vue'
import Dap from 'dap-util'
import { Cell } from '../cell'
import { TransitionSlide } from '../transition-slide'
import { CollapseItemProps } from './props'

//实例
const instance = getCurrentInstance()!

if (!instance.parent || instance.parent.type.name != 'm-collapse') {
	throw new Error(`The component 'CollapseItem' must be used as a subcomponent of the component 'Collapse'`)
}

//加入到collapse的children去
instance.parent!.exposed!.children.value.push(instance)

//uid
const uid = instance.uid

//属性
const props = defineProps(CollapseItemProps)

//面板的序列
const index = computed<number>(() => {
	return instance.parent!.exposed!.children.value.findIndex((vm: ComponentInternalInstance) => {
		return Dap.common.equal(vm.uid, uid)
	})
})
//是否禁用
const cmpDisabled = computed<boolean>(() => {
	return instance.parent!.exposed!.props.disabled || props.disabled
})
//点击态
const cmpActive = computed<boolean>(() => {
	if (cmpDisabled.value) {
		return false
	}
	return instance.parent!.exposed!.props.active
})
//是否展开
const expand = computed<boolean>(() => {
	let flag = false
	//手风琴模式
	if (instance.parent!.exposed!.props.accordion) {
		if (instance.parent!.exposed!.props.modelValue === index.value) {
			flag = true
		}
	}
	//非手风琴模式
	else {
		//值为数字
		if (Dap.number.isNumber(instance.parent!.exposed!.props.modelValue)) {
			if (instance.parent!.exposed!.props.modelValue === index.value) {
				flag = true
			}
		}
		//值为数组
		else if (Array.isArray(instance.parent!.exposed!.props.modelValue)) {
			if (instance.parent!.exposed!.props.modelValue.includes(index.value)) {
				flag = true
			}
		}
	}
	return flag
})

//面板展开前触发
const beforeSlideDown = () => {
	instance.parent!.exposed!.emits('before-slide-down', index.value)
}
//面板展开后触发
const slideDown = () => {
	instance.parent!.exposed!.emits('slide-down', index.value)
}
//面板收起前触发
const beforeSlideUp = () => {
	instance.parent!.exposed!.emits('before-slide-up', index.value)
}
//面板收起后触发
const slideUp = () => {
	instance.parent!.exposed!.emits('slide-up', index.value)
}
//点击collapse-item
const changeCollapse = () => {
	if (cmpDisabled.value) {
		return false
	}
	//手风琴模式
	if (instance.parent!.exposed!.props.accordion) {
		//关闭当前面板
		if (instance.parent!.exposed!.props.modelValue == index.value) {
			instance.parent!.exposed!.emits('update:modelValue', null)
		}
		//打开面板
		else {
			instance.parent!.exposed!.emits('update:modelValue', index.value)
		}
	}
	//非手风琴模式
	else {
		//值为数字
		if (Dap.number.isNumber(instance.parent!.exposed!.props.modelValue)) {
			//关闭当前展开的面板
			if (instance.parent!.exposed!.props.modelValue == index.value) {
				instance.parent!.exposed!.emits('update:modelValue', [])
			}
			//打开面板
			else {
				instance.parent!.exposed!.emits('update:modelValue', [instance.parent!.exposed!.props.modelValue, index.value])
			}
		}
		//值为数组
		else if (Array.isArray(instance.parent!.exposed!.props.modelValue)) {
			let arr = [...instance.parent!.exposed!.props.modelValue]
			//关闭当前面板
			if (arr.includes(index.value)) {
				arr = arr.filter(item => {
					return item != index.value
				})
				instance.parent!.exposed!.emits('update:modelValue', arr)
			}
			//打开面板
			else {
				arr.push(index.value)
				instance.parent!.exposed!.emits('update:modelValue', arr)
			}
		} else {
			let arr = []
			arr.push(index.value)
			instance.parent!.exposed!.emits('update:modelValue', arr)
		}
	}
}
</script>

<template>
	<div class="mvi-collapse-item" :class="{ border: instance.parent?.exposed?.props?.outBorder }" :disabled="cmpDisabled || null">
		<Cell class="mvi-collapse-cell" :class="{ expand: expand }" :icon="icon" :content="label" :title="title" :border="instance.parent?.exposed?.props?.inBorder" arrow="angle-right" @click="changeCollapse" :active="cmpActive" :no-wrap="instance.parent?.exposed?.props?.noWrap"></Cell>
		<TransitionSlide :expand="expand" :timeout="200" @before-slide-up="beforeSlideUp" @slide-up="slideUp" @before-slide-down="beforeSlideDown" @slide-down="slideDown">
			<div class="mvi-collapse-content">
				<slot v-if="$slots.default"></slot>
				<span v-else v-text="content"></span>
			</div>
		</TransitionSlide>
	</div>
</template>

<style scoped src="./collapse-item.less"></style>
