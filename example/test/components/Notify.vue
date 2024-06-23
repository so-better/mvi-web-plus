<template>
	<div class="mvi-p-2">
		<m-button @click="showNotify">按钮</m-button>
	</div>
</template>
<script setup lang="ts">
import { inject } from 'vue'

const $showNotify = inject<(arg: any) => void>('$showNotify')!
const showNotify = () => {
	$showNotify({
		message: '欢迎使用',
		icon: 'success-o'
	})
}
</script>
<style lang="less"></style>
