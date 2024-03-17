<template>
	<div class="mvi-p-2">
		<m-button @click="show = !show">显示模态框</m-button>
		<m-modal mount-el="#app" show-times v-model="show" closable title="模态框标题模态框标题模态框标题模态框标题模态框标题" footer="2024-03-18" fullScreen>
			<p>这是一个模态框</p>
			<p>This is a Modal</p>
		</m-modal>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
<style lang="less"></style>
