<template>
	<div :class="['mvi-divider', dashed ? 'dashed' : '']">
		<div class="mvi-divider-left" :style="{ borderColor: color || '' }"></div>
		<div v-if="$slots.default" class="mvi-divider-center">
			<slot></slot>
		</div>
		<div class="mvi-divider-right" :style="{ borderColor: color || '' }"></div>
	</div>
</template>
<script setup lang="ts">
import { DividerProps } from './props'

defineOptions({
	name: 'm-divider'
})

defineProps(DividerProps)
</script>

<style scoped src="./divider.less"></style>
