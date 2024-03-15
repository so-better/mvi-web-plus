<template>
	<div class="mvi-p-2">
		<div class="mvi-mb-4">
			<m-button @click="show = !show">打开/关闭</m-button>
		</div>
		<m-transition-slide :expand="show" :timeout="1000">
			<div class="mvi-bg-success" style="height: 4rem"></div>
		</m-transition-slide>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
<style lang="less"></style>
