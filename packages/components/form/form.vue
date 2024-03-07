<script setup name="m-form" lang="ts">
import { FormProps } from './props'
defineProps(FormProps)
</script>

<template>
	<div class="mvi-form" :class="{ block: block }" :style="{ width: block && width ? width : '' }">
		<slot></slot>
	</div>
</template>

<style scoped src="./form.less"></style>
