<template>
	<div class="mvi-p-2">
		<div>{{ value }}</div>
		<div class="mvi-mb-4">
			<m-button @click="value = '3333'">禁用/启用编辑器</m-button>
		</div>
		<m-editor placeholder="请输入内容" autofocus border :disabled="disabled" @change="change" auto-height ref="editor" v-model="value"></m-editor>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: true,
			disabled: false,
			value: '<br>'
		}
	},
	mounted() {},
	methods: {
		change(newVal, oldVal) {
			//console.log(newVal, oldVal)
		},
		pasteFile(files) {
			//console.log(files)
		}
	}
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
