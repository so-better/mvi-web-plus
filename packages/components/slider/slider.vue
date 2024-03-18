<template>
	<div :disabled="disabled || null" class="mvi-slider" :class="{ round: round, square: !round && square, vertical: vertical }" :style="sliderStyle" @click="dragTo" ref="elRef">
		<div ref="barRef" class="mvi-slider-bar" :style="sliderBarStyle"></div>
		<div class="mvi-slider-button" ref="btnRef">
			<slot name="button" v-if="$slots.button"></slot>
			<div v-else class="mvi-slider-button-el" :style="buttonElStyle"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Drag } from '../../directives/drag'
import { SliderProps } from './props'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({
	name: 'm-slider'
})

//属性
const props = defineProps(SliderProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

const drag = ref<Drag | null>(null)
const isdrag = ref<boolean>(false)
const btnRef = ref<HTMLElement | null>(null)
const barRef = ref<HTMLElement | null>(null)
const elRef = ref<HTMLElement | null>(null)

const sliderStyle = computed<any>(() => {
	let style: any = {}
	if (props.trackColor) {
		style.background = props.trackColor
	}
	if (props.strokeWidth) {
		if (props.vertical) {
			style.width = props.strokeWidth
		} else {
			style.height = props.strokeWidth
		}
	}
	return style
})
const sliderBarStyle = computed<any>(() => {
	let style: any = {}
	if (props.color) {
		style.background = props.color
	}
	let percent = Dap.number.divide(Dap.number.subtract(props.modelValue, props.min), Dap.number.subtract(props.max, props.min))
	if (props.vertical) {
		style.height = `calc(${percent} * 100%)`
	} else {
		style.width = `calc(${percent} * 100%)`
	}
	return style
})
const buttonElStyle = computed<any>(() => {
	let style: any = {}
	if (props.strokeWidth) {
		style.width = `calc(${props.strokeWidth} * 2)`
		style.height = `calc(${props.strokeWidth} * 2)`
	}
	return style
})

watch(
	() => props.disabled,
	newValue => {
		if (drag.value) {
			if (newValue) {
				if (props.vertical) {
					drag.value.draggableY = false
				} else {
					drag.value.draggableX = false
				}
			} else {
				if (props.vertical) {
					drag.value.draggableY = true
				} else {
					drag.value.draggableX = true
				}
			}
		}
	}
)

watch(
	() => props.vertical,
	() => {
		nextTick(() => {
			setBtnOffset()
		})
	}
)

watch(
	() => props.modelValue,
	() => {
		if (!isdrag.value) {
			setBtnOffset()
		}
	}
)

//拖拽
const onDrag = (_el: HTMLElement, _container: HTMLElement, placement: any) => {
	isdrag.value = true
	if (props.vertical) {
		let value = Dap.number.add(Dap.number.mutiply(Dap.number.divide(Dap.number.add(placement.top, Dap.number.divide(btnRef.value!.offsetHeight, 2)), elRef.value!.offsetHeight), Dap.number.subtract(props.max, props.min)), props.min)
		emits('update:modelValue', value)
		emits('change', value)
	} else {
		let value = Dap.number.add(Dap.number.mutiply(Dap.number.divide(Dap.number.add(placement.left, Dap.number.divide(btnRef.value!.offsetWidth, 2)), elRef.value!.offsetWidth), Dap.number.subtract(props.max - props.min)), props.min)
		emits('update:modelValue', value)
		emits('change', value)
	}
}
//设置按钮的移动距离
const setBtnOffset = () => {
	if (props.vertical) {
		btnRef.value!.style.left = '50%'
		btnRef.value!.style.top = Dap.number.subtract(Dap.number.mutiply(Dap.number.divide(Dap.number.subtract(props.modelValue, props.min), Dap.number.subtract(props.max - props.min)), elRef.value!.offsetHeight), Dap.number.divide(btnRef.value!.offsetHeight, 2)) + 'px'
	} else {
		btnRef.value!.style.top = '50%'
		btnRef.value!.style.left = Dap.number.subtract(Dap.number.mutiply(Dap.number.divide(Dap.number.subtract(props.modelValue, props.min), Dap.number.subtract(props.max - props.min)), elRef.value!.offsetWidth), Dap.number.divide(btnRef.value!.offsetWidth, 2)) + 'px'
	}
}
//跳转到指定位置
const dragTo = (event: MouseEvent) => {
	if (props.disabled) {
		return
	}
	if (isdrag.value) {
		return
	}
	if (Dap.element.isContains(btnRef.value!, <HTMLElement>event.target)) {
		return
	}
	if (props.vertical) {
		let top = event.offsetY
		let value = Dap.number.add(Dap.number.mutiply(Dap.number.divide(top, elRef.value!.offsetHeight), Dap.number.subtract(props.max, props.min)), props.min)
		emits('update:modelValue', value)
		emits('change', value)
	} else {
		let left = event.offsetX
		let value = Dap.number.add(Dap.number.mutiply(Dap.number.divide(left, elRef.value!.offsetWidth), Dap.number.subtract(props.max, props.min)), props.min)
		emits('update:modelValue', value)
		emits('change', value)
	}
}

onMounted(() => {
	setBtnOffset()
	drag.value = new Drag(btnRef.value!, {
		container: elRef.value!,
		mode: 'on',
		draggableY: props.vertical && !props.disabled,
		draggableX: !props.vertical && !props.disabled,
		cursor: false,
		drag: onDrag,
		dragged: () => {
			nextTick(() => {
				setTimeout(() => {
					isdrag.value = false
				}, 10)
			})
		}
	})
	drag.value.init()
})

onBeforeUnmount(() => {
	if (drag.value) {
		drag.value.destroy()
	}
})
</script>

<style scoped src="./slider.less"></style>
