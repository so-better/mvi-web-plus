<template>
	<div class="mvi-p-2">
		<m-editor-menus border ref="editorMenus"></m-editor-menus>
		<m-editor border placeholder="请输入内容" v-model="value" ref="editor"></m-editor>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: true,
			value: '<p>使用autofocus可以使<span style="color:#ff3300;">编辑器在初始化</span>完成后自动获取焦点</p><p>使用autofocus可以使编辑器在初始化完成后自动获取焦点</p><p>使用autofocus可以使编辑器在初始化完成后自动获取焦点</p>'
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

.a {
	display: block;
	width: 7rem;
	height: 7rem;
	border-radius: 1rem;
	background-color: #eee;
	position: absolute;
}
</style>
