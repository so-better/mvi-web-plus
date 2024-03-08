<script setup name="m-tab" lang="ts">
import { computed, getCurrentInstance, ref, ComponentInternalInstance, onBeforeUnmount } from 'vue'
import Dap from 'dap-util'
import { TabProps } from './props'

//实例
const instance = getCurrentInstance()!

if (!instance.parent || instance.parent.type.name != 'm-tabs') {
	throw new Error(`The component 'Tab' must be used as a subcomponent of the component 'Tabs'`)
}

//加入到tabs的children去
instance.parent!.exposed!.children.value.push(instance)

//属性
defineProps(TabProps)

const show = ref<boolean>(false)
const back = ref<boolean>(false)
const firstShow = ref<boolean>(false)

const tabStyle = computed<any>(() => {
	let style: any = {}
	if (instance.parent!.props.animation == 'slide') {
		style.transition = 'left ' + instance.parent!.props.timeout + 'ms,opacity ' + instance.parent!.props.timeout + 'ms'
	} else if (instance.parent!.props.animation == 'fade') {
		style.transition = 'opacity ' + instance.parent!.props.timeout + 'ms'
	}
	return style
})
//tab在tabs中的序列值
const tabIndex = computed<number>(() => {
	return instance.parent!.exposed!.children.value.findIndex((vm: ComponentInternalInstance) => {
		return Dap.common.equal(vm.uid, instance.uid)
	})
})

if (instance.parent.props!.modelValue == tabIndex.value) {
	show.value = true
	if (!firstShow.value) {
		firstShow.value = true
	}
}
onBeforeUnmount(() => {
	instance.parent!.exposed!.children.value.splice(tabIndex.value, 1)
	if (<number>instance.parent!.props.modelValue > 0) {
		instance.parent!.emit('update:modelValue', <number>instance.parent!.props.modelValue - 1)
		instance.parent!.emit('change', <number>instance.parent!.props.modelValue - 1)
	} else {
		instance.parent!.exposed!.to(0, 0)
	}
})

defineExpose({
	show,
	back,
	firstShow
})
</script>

<template>
	<transition :name="'mvi-tab-' + instance.parent?.props.animation + (back ? '-back' : '')">
		<div v-show="show" v-if="firstShow" class="mvi-tab" :style="tabStyle">
			<slot></slot>
		</div>
	</transition>
</template>

<style scoped src="./tab.less"></style>
