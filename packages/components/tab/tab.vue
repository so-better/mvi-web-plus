<script setup name="m-tab" lang="ts">
import { computed, getCurrentInstance, ref, ComponentInternalInstance, onBeforeUnmount, inject, reactive } from 'vue'
import Dap from 'dap-util'
import { TabProps } from './props'

//实例
const instance = getCurrentInstance()!

//获取tabs组件实例
const tabs = inject<ComponentInternalInstance | null>('tabs', null)

//判断是否在Tabs组件内
if (!tabs || tabs.type.name != 'm-tabs') {
	throw new Error(`The component 'Tab' must be used as a subcomponent of the component 'Tabs'`)
}

//加入到tabs的children去
tabs.exposed!.children.value.push(instance)

//属性
defineProps(TabProps)

const back = ref<boolean>(false)

const tabStyle = computed<any>(() => {
	let style: any = {}
	if (tabs.props.animation == 'slide') {
		style.transition = 'left ' + tabs.props.timeout + 'ms,opacity ' + tabs.props.timeout + 'ms'
	} else if (tabs.props.animation == 'fade') {
		style.transition = 'opacity ' + tabs.props.timeout + 'ms'
	}
	return style
})
//tab在tabs中的序列值
const tabIndex = computed<number>(() => {
	return tabs.exposed!.children.value.findIndex((vm: ComponentInternalInstance) => {
		return Dap.common.equal(vm.uid, instance.uid)
	})
})

const show = ref<boolean>(tabs.props!.modelValue == tabIndex.value)
const firstShow = ref<boolean>(tabs.props!.modelValue == tabIndex.value)

onBeforeUnmount(() => {
	tabs.exposed!.children.value.splice(tabIndex.value, 1)
	if (<number>tabs.props.modelValue > 0) {
		tabs.emit('update:modelValue', <number>tabs.props.modelValue - 1)
		tabs.emit('change', <number>tabs.props.modelValue - 1)
	} else {
		tabs.exposed!.to(0, 0)
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

<template>
	<transition :name="'mvi-tab-' + tabs.props.animation + (back ? '-back' : '')">
		<div v-show="show" v-if="firstShow" class="mvi-tab" :style="tabStyle">
			<slot></slot>
		</div>
	</transition>
</template>

<style scoped src="./tab.less"></style>
