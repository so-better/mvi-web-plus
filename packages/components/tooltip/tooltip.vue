<template>
	<div @click="clickShowTooltip" @mouseenter="hoverShowTooltip" @mouseleave="hoverHideToolTip" class="mvi-tooltip" :class="{ block: block }" :data-id="'mvi-tooltip-' + instance.uid" v-bind="$attrs">
		<slot></slot>
	</div>
	<Layer v-model="show" :offset="offset" :background="innerColor" border :border-color="innerBorderColor" closable :show-triangle="showTriangle" :z-index="zIndex" :relate="`[data-id='mvi-tooltip-${instance.uid}']`" :placement="placement" :width="width" :timeout="timeout" :animation="animation || 'mvi-tooltip'" :shadow="false">
		<div class="mvi-tooltip-content" :style="{ color: innerTextColor, whiteSpace: width ? 'normal' : '' }">
			<slot v-if="$slots.title" name="title"></slot>
			<span v-else v-text="title"></span>
		</div>
	</Layer>
</template>
<script setup lang="ts">
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import { Layer } from '@/components/layer'
import { TooltipProps } from './props'
import { isDark } from '@/utils'
import { Observe } from '@/directives/observe'

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
//observe对象
const observe = ref<Observe | null>(null)
//边框颜色
const innerBorderColor = ref<string>(props.borderColor || (isDark() ? '#fff' : '#1a1a1a'))
//背景色
const innerColor = ref<string>(props.color || (isDark() ? '#fff' : '#1a1a1a'))
//字体颜色
const innerTextColor = ref<string>(props.textColor || (isDark() ? '#1a1a1a' : '#fff'))

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

onMounted(() => {
	//深色模式监听
	observe.value = new Observe(document.documentElement, {
		attributes: true,
		childList: false,
		subtree: false,
		attributeNames: ['data-mvi-dark'],
		attributesChange: () => {
			innerBorderColor.value = props.borderColor || (isDark() ? '#fff' : '#1a1a1a')
			innerColor.value = props.color || (isDark() ? '#fff' : '#1a1a1a')
			innerTextColor.value = props.textColor || (isDark() ? '#1a1a1a' : '#fff')
		}
	})
	observe.value.init()
})

onBeforeUnmount(() => {
	//移除深色模式监听
	observe.value?.destroy()
})

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
