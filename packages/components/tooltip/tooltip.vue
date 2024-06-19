<template>
	<div @click="clickShowTooltip" @mouseenter="hoverShowTooltip" @mouseleave="hoverHideToolTip" class="mvi-tooltip" :class="{ block: block }" :data-id="'mvi-tooltip-' + instance.uid" v-bind="$attrs">
		<slot></slot>
	</div>
	<Layer v-model="show" :offset="offset" :background="color" border :border-color="borderColor" closable :show-triangle="showTriangle" :z-index="zIndex" :relate="`[data-id='mvi-tooltip-${instance.uid}']`" :placement="placement" :width="width" :timeout="timeout" :animation="animation || 'mvi-tooltip'" :shadow="false">
		<div class="mvi-tooltip-content" :style="{ color: textColor, whiteSpace: width ? 'normal' : '' }">
			<slot v-if="$slots.title" name="title"></slot>
			<span v-else v-text="title"></span>
		</div>
	</Layer>
</template>
<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { Layer } from '@/components/layer'
import { TooltipProps } from './props'

defineOptions({
	name: 'm-tooltip',
	inheritAttrs: false
})

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
<style scoped src="./tooltip.less"></style>

<style lang="less">
.mvi-tooltip-enter-from,
.mvi-tooltip-leave-to {
	opacity: 0;
}
</style>
