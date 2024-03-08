<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '../icon'
import { LabelProps } from './props'

defineOptions({
	name: 'm-label'
})

//属性
const props = defineProps(LabelProps)

//可隐藏标签的显示状态
const show = ref<boolean>(true)

//标签样式类
const labelClass = computed<string[]>(() => {
	let cls: string[] = []
	if (props.size) {
		cls.push(props.size)
	}
	if (props.type) {
		cls.push(props.type)
	}
	if (props.plain) {
		cls.push('plain')
	}
	if (props.round) {
		cls.push('round')
	}
	if (props.mark) {
		cls.push('mark')
		if (props.reverse) {
			cls.push('reverse')
		}
	}
	return cls
})

//关闭标签的方法
const closeLabel = () => {
	show.value = false
}
</script>

<template>
	<transition v-if="closable" name="mvi-label">
		<div v-if="show" class="mvi-label" :class="labelClass">
			<slot></slot>
			<span class="mvi-label-closable" @click="closeLabel">
				<Icon type="times" />
			</span>
		</div>
	</transition>
	<div v-else class="mvi-label" :class="labelClass">
		<slot></slot>
	</div>
</template>

<style scoped src="./label.less"></style>
