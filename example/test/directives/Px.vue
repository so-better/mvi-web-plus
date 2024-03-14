<template>
	<div class="mvi-p-2">
		<fieldset class="mvi-mb-10" v-px:border-width>
			<legend>边框实现1px</legend>
			<m-button block v-px="{ attr: 'border-width' }">按钮实现1px</m-button>
		</fieldset>
		<fieldset v-px:border-width>
			<legend>伪类实现1px</legend>
			<m-cell border v-px:border-width.after title="Cell"></m-cell>
			<m-cell title="Cell"></m-cell>
		</fieldset>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped></style>
