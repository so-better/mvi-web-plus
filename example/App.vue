<template>
	<div class="mvi-p-2">
		<m-editor-menus :config="[{ key: 'codeView', name: '显示源码', icon: 'eye', data: show, index: 1 }]" border ref="editorMenus"></m-editor-menus>
		<m-editor border placeholder="请输入内容" v-model="value" ref="editor"></m-editor>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: true,
			value: '<p><br></p>'
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.editorMenus)
	},
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

.a {
	display: block;
	width: 7rem;
	height: 7rem;
	border-radius: 1rem;
	background-color: #eee;
	position: absolute;
}
</style>
