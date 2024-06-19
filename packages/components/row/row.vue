<template>
	<Row class="mvi-row" :style="{ justifyContent: justify, alignItems: align }">
		<slot></slot>
	</Row>
</template>
<script setup lang="ts">
import { defineComponent, getCurrentInstance, h, provide, useSlots } from 'vue'
import { componentIsMatch } from '@/utils'
import { RowProps } from './props'

defineOptions({
	name: 'm-row'
})

const instance = getCurrentInstance()!

//插槽内容是否匹配判定
componentIsMatch(instance, 'm-col', ['Row', 'Col'])

provide('row', instance)

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
