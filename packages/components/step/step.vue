<template>
	<div class="mvi-step-vertical" v-if="steps.props.vertical" ref="elRef">
		<div class="mvi-step-vertical-label" :class="{ finish: stepIndex == steps.props.active }" :style="labelStyle">
			<slot></slot>
		</div>
		<div class="mvi-step-vertical-container">
			<div class="mvi-step-vertical-icon">
				<Icon class="mvi-step-icon-active-el" v-if="steps.props.active == stepIndex && (parseIcon(<string | IconPropsType>steps.props.activeIcon).type || parseIcon(<string | IconPropsType>steps.props.activeIcon).url)" :type="parseIcon(<string | IconPropsType>steps.props.activeIcon).type" :url="parseIcon(<string | IconPropsType>steps.props.activeIcon).url" :spin="parseIcon(<string | IconPropsType>steps.props.activeIcon).spin" :size="parseIcon(<string | IconPropsType>steps.props.activeIcon).size" :color="parseIcon(<string | IconPropsType>steps.props.activeIcon).color" :style="activeIconStyle" />
				<div class="mvi-step-circle-active" v-else-if="steps.props.active == stepIndex" :style="activeCircleStyle"></div>
				<Icon :class="['mvi-step-icon-inactive-el', stepIndex <= <number>steps.props.active ? 'finish' : '']" v-else-if="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).type || parseIcon(<string | IconPropsType>steps.props.inactiveIcon).url" :type="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).type" :url="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).url" :spin="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).spin" :size="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).size" :color="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).color" :style="inactiveIconStyle" />
				<div class="mvi-step-circle" :class="{ finish: stepIndex <= <number>steps.props.active }" v-else :style="circleStyle"></div>
			</div>
			<div class="mvi-step-vertical-line" :class="{ last: stepIndex == stepChildren.length - 1, finish: stepIndex < <number>steps.props.active }" :style="lineStyle"></div>
		</div>
	</div>
	<div v-else class="mvi-step" ref="elRef" :class="{ last: stepIndex == stepChildren.length - 1 }">
		<div class="mvi-step-label" :class="{ last: stepIndex == stepChildren.length - 1, first: stepIndex == 0, finish: stepIndex == steps.props.active }" :style="labelStyle">
			<div>
				<slot></slot>
			</div>
		</div>
		<div class="mvi-step-container">
			<div class="mvi-step-icon" :class="{ last: stepIndex == stepChildren.length - 1 }" :style="stepIconStyle">
				<Icon class="mvi-step-icon-active-el" v-if="steps.props.active == stepIndex && (parseIcon(<string | IconPropsType>steps.props.activeIcon).type || parseIcon(<string | IconPropsType>steps.props.activeIcon).url)" :type="parseIcon(<string | IconPropsType>steps.props.activeIcon).type" :url="parseIcon(<string | IconPropsType>steps.props.activeIcon).url" :spin="parseIcon(<string | IconPropsType>steps.props.activeIcon).spin" :size="parseIcon(<string | IconPropsType>steps.props.activeIcon).size" :color="parseIcon(<string | IconPropsType>steps.props.activeIcon).color" :style="activeIconStyle" />
				<div class="mvi-step-circle-active" v-else-if="steps.props.active == stepIndex" :style="activeCircleStyle"></div>
				<Icon class="mvi-step-icon-inactive-el" :class="{ finish: stepIndex <= <number>steps.props.active }" v-else-if="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).type || parseIcon(<string | IconPropsType>steps.props.inactiveIcon).url" :type="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).type" :url="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).url" :spin="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).spin" :size="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).size" :color="parseIcon(<string | IconPropsType>steps.props.inactiveIcon).color" :style="inactiveIconStyle" />
				<div class="mvi-step-circle" :class="{ finish: stepIndex <= <number>steps.props.active }" v-else :style="circleStyle"></div>
			</div>
			<div class="mvi-step-line" :class="{ last: stepIndex == stepChildren.length - 1, finish: stepIndex < <number>steps.props.active }" :style="lineStyle"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ComponentInternalInstance, Ref, computed, getCurrentInstance, inject, onBeforeUnmount, ref } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { IconPropsType } from '../icon/props'

defineOptions({
	name: 'm-step'
})

//实例
const instance = getCurrentInstance()!

//获取Steps组件
const steps = inject<ComponentInternalInstance | null>('steps', null)
const stepChildren = inject<Ref<ComponentInternalInstance[]> | null>('stepChildren', null)

if (!stepChildren || !steps || steps.type.name != 'm-steps') {
	throw new Error(`The component 'Step' must be used as a subcomponent of the component 'Steps'`)
}

//加入到steps的children去
stepChildren.value.push(instance)

const elRef = ref<HTMLElement | null>(null)

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
//step在steps中的序列值
const stepIndex = computed<number>(() => {
	return stepChildren.value.findIndex((vm: ComponentInternalInstance) => {
		return Dap.common.equal(vm.uid, instance.uid)
	})
})
//label
const labelStyle = computed<any>(() => {
	let style: any = {}
	if (steps.props.activeColor) {
		if (steps.props.active == stepIndex.value) {
			style.color = steps.props.activeColor
		}
	}
	if (steps.props.inactiveColor) {
		if (steps.props.active != stepIndex.value) {
			style.color = steps.props.inactiveColor
		}
	}
	return style
})
const activeIconStyle = computed<any>(() => {
	let style: any = {}
	if (steps.props.activeColor) {
		if (steps.props.active == stepIndex.value) {
			style.color = steps.props.activeColor
		}
	}
	return style
})
const inactiveIconStyle = computed<any>(() => {
	let style: any = {}
	if (steps.props.inactiveColor) {
		if (stepIndex.value > <number>steps.props.active) {
			style.color = steps.props.inactiveColor
		}
	}
	if (steps.props.activeColor) {
		if (stepIndex.value <= <number>steps.props.active) {
			style.color = steps.props.activeColor
		}
	}
	return style
})
const circleStyle = computed<any>(() => {
	let style: any = {}
	if (stepIndex.value <= <number>steps.props.active) {
		if (steps.props.activeColor) {
			style.backgroundColor = steps.props.activeColor
		}
	} else {
		if (steps.props.inactiveColor) {
			style.backgroundColor = steps.props.inactiveColor
		}
	}
	return style
})
const activeCircleStyle = computed<any>(() => {
	let style: any = {}
	if (steps.props.activeColor) {
		if (steps.props.active == stepIndex.value) {
			style.backgroundColor = steps.props.activeColor
		}
	}
	return style
})
const lineStyle = computed<any>(() => {
	let style: any = {}
	if (steps.props.activeColor) {
		if (stepIndex.value < <number>steps.props.active) {
			if (steps.props.vertical) {
				style.borderRightColor = steps.props.activeColor
			} else {
				style.borderTopColor = steps.props.activeColor
			}
		}
	}
	if (steps.props.inactiveColor) {
		if (stepIndex.value >= <number>steps.props.active) {
			if (steps.props.vertical) {
				style.borderRightColor = steps.props.inactiveColor
			} else {
				style.borderTopColor = steps.props.inactiveColor
			}
		}
	}
	return style
})
const stepIconStyle = computed<any>(() => {
	let style: any = {}
	if (elRef.value) {
		style.backgroundColor = Dap.element.getCssStyle(steps.proxy!.$el, 'background-color')
	}
	return style
})

onBeforeUnmount(() => {
	stepChildren.value.splice(stepIndex.value, 1)
})
</script>
<style scoped src="./step.less"></style>
