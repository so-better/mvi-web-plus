<script setup name="m-tooltip" lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { Layer } from '../layer'
import { TooltipProps } from './props'

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(TooltipProps)

//是否显示
const show = ref<boolean>(false)

//api：显示
const showTooltip = () => {
	if (props.disabled) {
		return
	}
	show.value = true
}
//api：隐藏
const hideTooltip = () => {
	if (props.disabled) {
		return
	}
	show.value = false
}
//鼠标进入显示
const hoverShowTooltip = () => {
	if (props.trigger == 'hover') {
		showTooltip()
	}
}
//鼠标移出隐藏
const hoverHideToolTip = () => {
	if (props.trigger == 'hover') {
		hideTooltip()
	}
}
//点击显示工具提示
const clickShowTooltip = () => {
	if (props.trigger === 'click') {
		if (show.value) {
			hideTooltip()
		} else {
			showTooltip()
		}
	}
}

defineExpose({
	showTooltip,
	hideTooltip
})
</script>

<template>
	<div class="mvi-tooltip" :class="{ block: block }">
		<div @click="clickShowTooltip" @mouseenter="hoverShowTooltip" @mouseleave="hoverHideToolTip" class="mvi-tooltip-toggle" :data-id="'mvi-tooltip-relate-' + instance.uid">
			<slot></slot>
		</div>
		<Layer v-model="show" :offset="offset" :background="color" border :border-color="borderColor" closable :show-triangle="showTriangle" :z-index="zIndex" :relate="`[data-id='mvi-tooltip-relate-${instance.uid}']`" :placement="placement" :width="width" :timeout="timeout" :animation="animation || 'mvi-tooltip'" :shadow="false">
			<div class="mvi-tooltip-content" :style="{ color: textColor, whiteSpace: width ? 'normal' : '' }">
				<slot v-if="$slots.title" name="title"></slot>
				<span v-else v-text="title"></span>
			</div>
		</Layer>
	</div>
</template>

<style scoped src="./tooltip.less"></style>

<style lang="less">
.mvi-tooltip-enter-from,
.mvi-tooltip-leave-to {
	opacity: 0;
}
</style>
