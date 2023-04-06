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
			value: '<table mvi-editor-insert="true" class="mvi-editor-table" cellpadding="0" cellspacing="0"><colgroup><col><col><col><col><col><col></colgroup><tbody><tr><td><br><span class="mvi-editor-colbtn"></span></td><td><br><span class="mvi-editor-colbtn"></span></td><td><br><span class="mvi-editor-colbtn"></span></td><td><br><span class="mvi-editor-colbtn"></span></td><td><br><span class="mvi-editor-colbtn"></span></td><td><br><span class="mvi-editor-colbtn"></span></td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr></tbody></table>'
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
