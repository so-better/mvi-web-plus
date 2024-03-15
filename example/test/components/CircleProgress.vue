<template>
	<div>
		<div class="mvi-mb-4">
			<m-button @click="changeValue">按钮</m-button>
		</div>
		<m-circle-progress :value="value" :size="4" :clockWise="false" :strokeWidth="1" :min="0" :max="100"></m-circle-progress>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(40)
const changeValue = () => {
	if (value.value > 100) {
		value.value = 0
	} else {
		value.value += 10
	}
}
</script>
<style lang="less"></style>
