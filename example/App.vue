<template>
	<div class="mvi-p-2">
		<div>{{ value }}</div>
		<m-editor-menus @custom="custom" :config="[{ key: 'codeView', name: '显示源码', icon: 'eye', data: show, index: 1 }]" border ref="editorMenus"></m-editor-menus>
		<m-editor placeholder="请输入内容..." border v-model="value" ref="editor"></m-editor>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: true,
			value: '<pre>const a = new Object()\nconst c = new Object()</pre><p><br></p>'
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.editorMenus)
	},
	methods: {
		uploadImage(e) {
			console.log(e)
		},
		uploadError(state, message, file) {
			console.log(state, message, file)
		},
		custom(options) {
			console.log(options)
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

.a {
	display: block;
	width: 7rem;
	height: 7rem;
	border-radius: 1rem;
	background-color: #eee;
	position: absolute;
}
</style>
