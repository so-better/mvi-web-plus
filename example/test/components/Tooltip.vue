<template>
	<div class="mvi-p-2">
		<m-tooltip block class="mvi-m-2" title="this is tooltip" trigger="hover">
			<m-button>按钮</m-button>
		</m-tooltip>
		<m-tooltip :color="color" class="mvi-m-2" title="this is tooltip" placement="top-end">
			<m-button>按钮</m-button>
		</m-tooltip>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#f30')

setTimeout(() => {
	color.value = '#3081af'
}, 1000)
</script>
<style lang="less"></style>
