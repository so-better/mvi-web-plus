<template>
	<div class="mvi-p-2">
		<div>{{ value }}</div>
		<m-button @click="disabled = !disabled">按钮</m-button>
		<m-editor ref="editor"></m-editor>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: true,
			disabled: false,
			value: ''
		}
	},
	mounted() {},
	methods: {}
}
</script>
<style lang="less">
html {
	font-size: 50px;
}

#app {
	height: 100%;
	overflow: auto;
}
</style>
