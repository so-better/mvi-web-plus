<template>
	<div>
		<m-button class="mvi-m-2" @click="showLoadingBar">打开加载进度条</m-button>
		<m-button class="mvi-m-2" @click="hideLoadingBar">关闭加载进度条</m-button>
	</div>
</template>
<script setup lang="ts">
import { inject } from 'vue'

const $showLoadingBar = inject<(arg?: any) => void>('$showLoadingBar')!
const $hideLoadingBar = inject<() => void>('$hideLoadingBar')!

const showLoadingBar = () => {
	$showLoadingBar()
}
const hideLoadingBar = () => {
	$hideLoadingBar()
}
</script>
<style lang="less"></style>
