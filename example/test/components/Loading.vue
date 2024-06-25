<template>
	<div class="mvi-p-2">
		<m-button @click="color = '#f30'"></m-button>
		<div class="mvi-mb-10">
			<m-loading :color="color" class="mvi-m-2"></m-loading>
			<m-loading class="mvi-m-2" type="circle"></m-loading>
			<m-loading class="mvi-m-2" type="dots"></m-loading>
			<m-loading class="mvi-m-2" type="transfer"></m-loading>
			<m-loading class="mvi-m-2" type="spin"></m-loading>
		</div>
		<div class="mvi-mb-10">
			<m-loading color="#000" class="mvi-m-2"></m-loading>
			<m-loading color="#000" class="mvi-m-2" type="circle"></m-loading>
			<m-loading color="#000" class="mvi-m-2" type="dots"></m-loading>
			<m-loading color="#000" class="mvi-m-2" type="transfer"></m-loading>
			<m-loading color="#000" class="mvi-m-2" type="spin"></m-loading>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#444')
</script>
<style lang="less"></style>
