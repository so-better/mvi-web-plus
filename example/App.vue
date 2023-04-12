<template>
	<div class="mvi-p-2">
		<m-button @click="disabled = !disabled">按钮</m-button>
		<m-editor-menus @custom="custom" :config="[{ key: 'codeView', name: '显示源码', icon: 'eye', data: show, index: 1 }]" border ref="editorMenus"></m-editor-menus>
		<m-editor :disabled="disabled" @input="uploadImage" placeholder="请输入内容..." border v-model="value" ref="editor"></m-editor>
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
	mounted() {
		this.$refs.editor.use(this.$refs.editorMenus)
	},
	methods: {
		uploadImage(e) {
			console.log(e.html)
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
