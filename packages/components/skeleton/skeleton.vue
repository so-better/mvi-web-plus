<script setup name="m-skeleton" lang="ts">
import { computed } from 'vue'
import { SkeletonProps } from './props'

//属性
const props = defineProps(SkeletonProps)

//每行样式
const rowStyle = computed<any>(() => {
	return (index: number) => {
		let style: any = {}
		if (props.rowWidth && typeof props.rowWidth == 'string') {
			style.width = props.rowWidth
		} else if (Array.isArray(props.rowWidth)) {
			style.width = props.rowWidth[index] || ''
		}
		return style
	}
})
//行数
const rowsArray = computed<number[]>(() => {
	let arr: number[] = []
	for (let i = 0; i < props.rows; i++) {
		arr.push(i)
	}
	return arr
})
</script>

<template>
	<div class="mvi-skeleton-container">
		<div v-if="loading" class="mvi-skeleton" :class="{ animation: animation }">
			<div v-if="avatar" class="mvi-skeleton-avatar">
				<div class="mvi-skeleton-avatar-el" :class="{ round: avatarRound }" :style="{ width: avatarSize || '', height: avatarSize || '' }"></div>
			</div>
			<div class="mvi-skeleton-rows">
				<div v-if="title" class="mvi-skeleton-title" :class="{ round: round }" :style="{ width: titleWidth || '' }"></div>
				<div v-for="item in rowsArray" :style="rowStyle(item)" class="mvi-skeleton-row" :class="{ round: round }"></div>
			</div>
		</div>
		<slot v-else></slot>
	</div>
</template>

<style scoped src="./skeleton.less"></style>
