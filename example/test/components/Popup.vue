<template>
	<div class="mvi-p-2">
		<div class="mvi-mb-4">
			<m-button @click="show = !show">打开遮罩层</m-button>
			<div style="position: relative; width: 2rem; height: 3rem">
				<m-popup showTimes placement="right" timesPlacement="top-left" usePadding mountEl=".body" closable width="2rem" v-model="show"></m-popup>
			</div>
			<div style="height: 2000px">打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
<style lang="less"></style>
