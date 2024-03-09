<template>
	<transition :name="'mvi-tab-' + tabs!.props.animation + (back ? '-back' : '')">
		<div v-show="show" v-if="firstShow" class="mvi-tab" :style="tabStyle">
			<slot></slot>
		</div>
	</transition>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, ref, ComponentInternalInstance, onBeforeUnmount, inject, reactive, Ref } from 'vue'
import Dap from 'dap-util'
import { TabProps } from './props'
import { parentIsMatch } from '../../utils'

defineOptions({
	name: 'm-tab'
})

//实例
const instance = getCurrentInstance()!

//获取tabs组件实例
const tabs = inject<ComponentInternalInstance | null>('tabs', null)
//获取tabs内部定义的children
const tabChildren = inject<Ref<ComponentInternalInstance[]> | null>('tabChildren', null)

parentIsMatch(tabChildren, tabs, 'm-tabs', ['Tabs', 'Tab'])

//加入到tabs的children去
tabChildren!.value.push(instance)

//属性
defineProps(TabProps)

const back = ref<boolean>(false)

const tabStyle = computed<any>(() => {
	let style: any = {}
	if (tabs!.props.animation == 'slide') {
		style.transition = 'left ' + tabs!.props.timeout + 'ms,opacity ' + tabs!.props.timeout + 'ms'
	} else if (tabs!.props.animation == 'fade') {
		style.transition = 'opacity ' + tabs!.props.timeout + 'ms'
	}
	return style
})
//tab在tabs中的序列值
const tabIndex = computed<number>(() => {
	return tabChildren!.value.findIndex((vm: ComponentInternalInstance) => {
		return Dap.common.equal(vm.uid, instance.uid)
	})
})

const show = ref<boolean>(tabs!.props!.modelValue == tabIndex.value)
const firstShow = ref<boolean>(tabs!.props!.modelValue == tabIndex.value)

onBeforeUnmount(() => {
	tabChildren!.value.splice(tabIndex.value, 1)
	if (<number>tabs!.props.modelValue > 0) {
		tabs!.emit('update:modelValue', <number>tabs!.props.modelValue - 1)
		tabs!.emit('change', <number>tabs!.props.modelValue - 1)
	} else {
		tabs!.exposed!.to(0, 0)
	}
})

defineExpose(
	reactive({
		show,
		firstShow,
		back
	})
)
</script>
<style scoped src="./tab.less"></style>
