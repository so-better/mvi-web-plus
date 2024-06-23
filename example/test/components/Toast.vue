<template>
	<div class="mvi-p-2">
		<m-button @click="show">按钮</m-button>
	</div>
</template>
<script setup lang="ts">
import { inject } from 'vue'

const $showToast = inject<(args: any) => void>('$showToast')!
const show = () => {
	$showToast({
		type: 'loading',
		message: '正在加载',
		// background: '#fff',
		// color: '#333',
		shadow: true
	})
}
</script>
<style lang="less"></style>
