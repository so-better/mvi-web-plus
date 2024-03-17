<template>
	<div class="mvi-color-picker">
		<!-- 饱和度和明度 -->
		<div class="mvi-color-picker-panel" ref="panelRef" :style="panelStyle" @click="clickPanelSetColor">
			<div class="mvi-color-picker-panel-slider" ref="sliderRef"></div>
		</div>
		<!-- 色相 -->
		<Slider v-model="hsv[0]" :min="0" :max="360" stroke-width="0.3rem" square track-color="linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)" color="transparent" @change="setValue">
			<template #button>
				<div class="mvi-color-picker-slider"></div>
			</template>
		</Slider>
		<!-- 透明度 -->
		<div v-if="showAlpha" class="mvi-color-picker-alpha">
			<Slider v-model="opacity" :min="0" :max="1" stroke-width="0.3rem" square :track-color="alphaTrackColor" color="transparent" @change="setValue">
				<template #button>
					<div class="mvi-color-picker-slider"></div>
				</template>
			</Slider>
		</div>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Drag } from '../../directives/drag'
import { Prop } from '../../directives/prop'
import { Slider } from '../slider'
import { ColorPickerProps } from './props'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({
	name: 'm-color-picker'
})

//属性
const props = defineProps(ColorPickerProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

//色相、饱和度和明度
const hsv = ref<number[]>([0, 0, 0])
//透明度
const opacity = ref<number>(1)
//是否拖动或者点击引起的值变化
const updateByDrag = ref<boolean>(false)
//是否在拖动
const dragging = ref<boolean>(false)
//面板高度对象
const heightObj = ref<Prop | null>(null)
//面板拖拽对象
const dragObj = ref<Drag | null>(null)
//面板元素
const panelRef = ref<HTMLElement | null>(null)
//slider元素
const sliderRef = ref<HTMLElement | null>(null)

//饱和度和明度面板背景色
const panelStyle = computed<any>(() => {
	const rgbValue = Dap.color.hsv2rgb([hsv.value[0], 100, 100])
	return {
		background: `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`
	}
})
//透明度进度条滑轨颜色
const alphaTrackColor = computed<string>(() => {
	const rgbValue = Dap.color.hsv2rgb(hsv.value)
	return `linear-gradient(to right, transparent 0%, rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}) 100%)`
})

//初始化
const initHSV = () => {
	if (updateByDrag.value) {
		return
	}
	//如果值为16进制的
	if (props.modelValue && Dap.common.matchingText(props.modelValue, 'hex')) {
		const rgbValue = Dap.color.hex2rgb(props.modelValue)
		hsv.value = Dap.color.rgb2hsv(rgbValue)
		opacity.value = 1
	}
	//为rgb格式的
	else {
		try {
			const first = props.modelValue.indexOf('(')
			const last = props.modelValue.lastIndexOf(')')
			const arry = props.modelValue.substring(first + 1, last).split(',')
			if (arry.length < 3) {
				throw new Error('Color values are not RGB (RGBA) format and hexadecimal format')
			}
			const rgbValue = [Number(arry[0]), Number(arry[1]), Number(arry[2])]
			hsv.value = Dap.color.rgb2hsv(rgbValue)
			opacity.value = arry.length == 4 ? Number(arry[3]) : 1
		} catch (e) {
			throw new Error('Color values are not RGB (RGBA) format and hexadecimal format')
		}
	}
}
//设置面板高度
const setPanelHeight = () => {
	if (heightObj.value) {
		return
	}
	heightObj.value = new Prop(panelRef.value!, 0.7)
	heightObj.value.init()
}
//设置面板拖拽
const setPanelDrag = () => {
	if (dragObj.value) {
		return
	}
	dragObj.value = new Drag(sliderRef.value!, {
		container: panelRef.value!,
		mode: 'on',
		draggableX: true,
		draggableY: true,
		cursor: false,
		beforeDrag: () => {
			updateByDrag.value = true
			dragging.value = true
		},
		drag: () => {
			const placement = Dap.element.getElementPoint(sliderRef.value, panelRef.value)
			hsv.value[1] = ((placement.left + sliderRef.value!.offsetWidth / 2) / panelRef.value!.offsetWidth) * 100
			hsv.value[2] = (1 - (placement.top + sliderRef.value!.offsetHeight / 2) / panelRef.value!.offsetHeight) * 100
			setValue()
		},
		dragged: () => {
			updateByDrag.value = false
			nextTick(() => {
				setTimeout(() => {
					dragging.value = false
				}, 10)
			})
		}
	})
	dragObj.value.init()
}
//设置面板上的拖拽点位置
const setSliderPlacement = () => {
	sliderRef.value!.style.left = (hsv.value[1] / 100) * panelRef.value!.offsetWidth - sliderRef.value!.offsetWidth / 2 + 'px'
	sliderRef.value!.style.top = (1 - hsv.value[2] / 100) * panelRef.value!.offsetHeight - sliderRef.value!.offsetHeight / 2 + 'px'
}
//更新选取的颜色值
const setValue = () => {
	const rgbValue = Dap.color.hsv2rgb(hsv.value)
	if (opacity.value == 1) {
		const val = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`
		emits('update:modelValue', val)
		emits('change', val)
	} else {
		const val = `rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]},${Number(opacity.value.toFixed(2))})`
		emits('update:modelValue', val)
		emits('change', val)
	}
}
//点击明度和饱和度面板直接设置颜色
const clickPanelSetColor = (e: MouseEvent) => {
	if (dragging.value) {
		return
	}
	updateByDrag.value = true
	sliderRef.value!.style.left = e.offsetX - sliderRef.value!.offsetWidth / 2 + 'px'
	sliderRef.value!.style.top = e.offsetY - sliderRef.value!.offsetHeight / 2 + 'px'
	const placement = Dap.element.getElementPoint(sliderRef.value, panelRef.value)
	hsv.value[1] = ((placement.left + sliderRef.value!.offsetWidth / 2) / panelRef.value!.offsetWidth) * 100
	hsv.value[2] = (1 - (placement.top + sliderRef.value!.offsetHeight / 2) / panelRef.value!.offsetHeight) * 100
	setValue()
}

//颜色值变化更新选取器滑块位置
watch(
	() => props.modelValue,
	() => {
		initHSV()
		setSliderPlacement()
	}
)

initHSV()

onMounted(() => {
	setPanelHeight()
	setPanelDrag()
	setSliderPlacement()
})

onBeforeUnmount(() => {
	if (dragObj.value) {
		dragObj.value.destroy()
	}
	if (heightObj.value) {
		heightObj.value.destroy()
	}
})
</script>
<style scoped src="./color-picker.less"></style>
