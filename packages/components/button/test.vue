<template>
	<div>
		<m-button class="mvi-m-2" v-for="item in types" loading :type="item">按钮</m-button>
		<m-button class="mvi-m-2" v-for="item in sizes" loading :size="item">按钮</m-button>

		<m-button class="mvi-m-2" v-for="item in types" loading load-text="正在加载中..." plain :type="item">按钮</m-button>
	</div>
</template>
<script setup lang="ts">
const types = ['default', 'info', 'success', 'error', 'warn', 'primary']
const sizes = ['mini', 'small', 'medium', 'large']
</script>
<style lang="less" scoped></style>
