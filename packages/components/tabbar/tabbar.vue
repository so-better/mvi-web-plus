<script setup name="m-tabbar" lang="ts">
import Dap from 'dap-util'
import TabbarItem from './tabbar-item.vue'
import { TabbarProps } from './props'
import { computed, getCurrentInstance, provide } from 'vue'

//获取实例
const instance = getCurrentInstance()!

provide('tabbar', instance)

//属性
const props = defineProps(TabbarProps)

//事件
const emits = defineEmits(['update:modelValue', 'item-click', 'change'])

const tabbarItemStyle = computed<(index: number) => any>(() => {
	return (index: number) => {
		let style: any = {}
		if (index != 0 && props.offset) {
			style.marginLeft = props.offset
		}
		return style
	}
})
const tabbarStyle = computed<any>(() => {
	let style: any = {}
	if (props.fixed && Dap.number.isNumber(props.zIndex)) {
		style.zIndex = props.zIndex
	}
	if (props.flex) {
		style.justifyContent = props.flex
	}
	return style
})
</script>

<template>
	<div class="mvi-tabbar" :class="{ border: border, fixed: fixed }" :style="tabbarStyle">
		<TabbarItem v-for="(item, index) in tabs" :name="item.name" :value="item.value" :icon="item.icon" :disabled="item.disabled" :badge="item.badge" :route="item.route" :style="tabbarItemStyle(index)"></TabbarItem>
	</div>
</template>

<style scoped src="./tabbar.less"></style>
