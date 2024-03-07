<script setup name="m-step" lang="ts">
import { ComponentInternalInstance, computed, getCurrentInstance, ref } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { IconPropsType } from '../icon/props'

//实例
const instance = getCurrentInstance()!

if (!instance.parent || instance.parent.type.name != 'm-steps') {
	throw new Error(`The component 'Step' must be used as a subcomponent of the component 'Steps'`)
}

//加入到steps的children去
instance.parent!.exposed!.children.value.push(instance)

//uid
const uid = instance.uid

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
	return instance.parent!.exposed!.children.value.findIndex((vm: ComponentInternalInstance) => {
		return Dap.common.equal(vm.uid, uid)
	})
})
//label
const labelStyle = computed<any>(() => {
	let style: any = {}
	if (instance.parent!.props.activeColor) {
		if (instance.parent!.props.active == stepIndex.value) {
			style.color = instance.parent!.props.activeColor
		}
	}
	if (instance.parent!.props.inactiveColor) {
		if (instance.parent!.props.active != stepIndex.value) {
			style.color = instance.parent!.props.inactiveColor
		}
	}
	return style
})
const activeIconStyle = computed<any>(() => {
	let style: any = {}
	if (instance.parent!.props.activeColor) {
		if (instance.parent!.props.active == stepIndex.value) {
			style.color = instance.parent!.props.activeColor
		}
	}
	return style
})
const inactiveIconStyle = computed<any>(() => {
	let style: any = {}
	if (instance.parent!.props.inactiveColor) {
		if (stepIndex.value > <number>instance.parent!.props.active) {
			style.color = instance.parent!.props.inactiveColor
		}
	}
	if (instance.parent!.props.activeColor) {
		if (stepIndex.value <= <number>instance.parent!.props.active) {
			style.color = instance.parent!.props.activeColor
		}
	}
	return style
})
const circleStyle = computed<any>(() => {
	let style: any = {}
	if (stepIndex.value <= <number>instance.parent!.props.active) {
		if (instance.parent!.props.activeColor) {
			style.backgroundColor = instance.parent!.props.activeColor
		}
	} else {
		if (instance.parent!.props.inactiveColor) {
			style.backgroundColor = instance.parent!.props.inactiveColor
		}
	}
	return style
})
const activeCircleStyle = computed<any>(() => {
	let style: any = {}
	if (instance.parent!.props.activeColor) {
		if (instance.parent!.props.active == stepIndex.value) {
			style.backgroundColor = instance.parent!.props.activeColor
		}
	}
	return style
})
const lineStyle = computed<any>(() => {
	let style: any = {}
	if (instance.parent!.props.activeColor) {
		if (stepIndex.value < <number>instance.parent!.props.active) {
			if (instance.parent!.props.vertical) {
				style.borderRightColor = instance.parent!.props.activeColor
			} else {
				style.borderTopColor = instance.parent!.props.activeColor
			}
		}
	}
	if (instance.parent!.props.inactiveColor) {
		if (stepIndex.value >= <number>instance.parent!.props.active) {
			if (instance.parent!.props.vertical) {
				style.borderRightColor = instance.parent!.props.inactiveColor
			} else {
				style.borderTopColor = instance.parent!.props.inactiveColor
			}
		}
	}
	return style
})
const stepIconStyle = computed<any>(() => {
	let style: any = {}
	if (elRef.value) {
		style.backgroundColor = Dap.element.getCssStyle(instance.parent!.proxy!.$el, 'background-color')
	}
	return style
})
</script>

<template>
	<div class="mvi-step-vertical" v-if="instance.parent?.props.vertical" ref="elRef">
		<div class="mvi-step-vertical-label" :class="{ finish: stepIndex == instance.parent?.props.active }" :style="labelStyle">
			<slot></slot>
		</div>
		<div class="mvi-step-vertical-container">
			<div class="mvi-step-vertical-icon">
				<Icon class="mvi-step-icon-active-el" v-if="instance.parent?.props.active == stepIndex && (parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).type || parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).url)" :type="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).type" :url="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).url" :spin="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).spin" :size="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).size" :color="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).color" :style="activeIconStyle" />
				<div class="mvi-step-circle-active" v-else-if="instance.parent?.props.active == stepIndex" :style="activeCircleStyle"></div>
				<Icon :class="['mvi-step-icon-inactive-el', stepIndex <= <number>instance.parent?.props.active ? 'finish' : '']" v-else-if="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).type || parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).url" :type="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).type" :url="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).url" :spin="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).spin" :size="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).size" :color="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).color" :style="inactiveIconStyle" />
				<div class="mvi-step-circle" :class="{ finish: stepIndex <= <number>instance.parent?.props.active }" v-else :style="circleStyle"></div>
			</div>
			<div class="mvi-step-vertical-line" :class="{ last: stepIndex == instance.parent?.exposed?.children.value.length - 1, finish: stepIndex < <number>instance.parent?.props.active }" :style="lineStyle"></div>
		</div>
	</div>
	<div v-else class="mvi-step" ref="elRef" :class="{ last: stepIndex == instance.parent?.exposed?.children.value.length - 1 }">
		<div class="mvi-step-label" :class="{ last: stepIndex == instance.parent?.exposed?.children.value.length - 1, first: stepIndex == 0, finish: stepIndex == instance.parent?.props.active }" :style="labelStyle">
			<div>
				<slot></slot>
			</div>
		</div>
		<div class="mvi-step-container">
			<div class="mvi-step-icon" :class="{ last: stepIndex == instance.parent?.exposed?.children.value.length - 1 }" :style="stepIconStyle">
				<Icon class="mvi-step-icon-active-el" v-if="instance.parent?.props.active == stepIndex && (parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).type || parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).url)" :type="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).type" :url="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).url" :spin="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).spin" :size="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).size" :color="parseIcon(<string | IconPropsType>instance.parent?.props.activeIcon).color" :style="activeIconStyle" />
				<div class="mvi-step-circle-active" v-else-if="instance.parent?.props.active == stepIndex" :style="activeCircleStyle"></div>
				<Icon class="mvi-step-icon-inactive-el" :class="{ finish: stepIndex <= <number>instance.parent!.props.active }" v-else-if="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).type || parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).url" :type="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).type" :url="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).url" :spin="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).spin" :size="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).size" :color="parseIcon(<string | IconPropsType>instance.parent?.props.inactiveIcon).color" :style="inactiveIconStyle" />
				<div class="mvi-step-circle" :class="{ finish: stepIndex <= <number>instance.parent?.props.active }" v-else :style="circleStyle"></div>
			</div>
			<div class="mvi-step-line" :class="{ last: stepIndex == instance.parent?.exposed?.children.value.length - 1, finish: stepIndex < <number>instance.parent?.props.active }" :style="lineStyle"></div>
		</div>
	</div>
</template>

<style scoped src="./step.less"></style>
