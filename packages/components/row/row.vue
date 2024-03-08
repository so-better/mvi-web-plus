<template>
	<Row class="mvi-row" :style="{ justifyContent: justify, alignItems: align }">
		<slot></slot>
	</Row>
</template>
<script setup lang="ts">
import { defineComponent, h, useSlots } from 'vue'
import { RowProps } from './props'

defineOptions({
	name: 'm-row'
})

//属性
const props = defineProps(RowProps)

//行组件
const Row = defineComponent(() => {
	return () => {
		return h(
			props.tag,
			{},
			{
				default: useSlots().default
			}
		)
	}
})
</script>
<style scoped src="./row.less"></style>
