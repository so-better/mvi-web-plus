<template>
	<div>
		<m-button class="mvi-m-2" @click="$msgbox('hello')">按钮</m-button>
		<m-button
			class="mvi-m-2"
			@click="
				$msgbox({
					message: 'hello',
					animation: 'translate'
				})
			"
			>按钮</m-button
		>
		<m-button
			class="mvi-m-2"
			@click="
				$msgbox({
					message: 'hello',
					animation: 'scale',
					background: '#fff',
					color: '#000'
				})
			"
			>按钮</m-button
		>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less"></style>
