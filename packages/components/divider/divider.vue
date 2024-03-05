<script setup name="m-divider" lang="ts">
import DividerProps from './props'
defineProps(DividerProps)
</script>
<template>
	<div :class="['mvi-divider', dashed ? 'dashed' : '']">
		<div class="mvi-divider-left" :style="{ borderColor: color || '' }"></div>
		<div v-if="$slots.default" class="mvi-divider-center">
			<slot></slot>
		</div>
		<div class="mvi-divider-right" :style="{ borderColor: color || '' }"></div>
	</div>
</template>
<style scoped src="./divider.less"></style>
