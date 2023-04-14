<template>
	<div class="mvi-p-2">
		<div>{{ value }}</div>
		<m-button @click="disabled = !disabled">按钮</m-button>
		<m-editor-menus border ref="editorMenus"></m-editor-menus>
		<m-editor :use-base64="false" @upload-image="uploadImage" border placeholder="Please Enter Text..." v-model="value" ref="editor"></m-editor>
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
			console.log(e)
			e.forEach(file => {
				const image = this.$dap.file.getImageUrl(file)
				this.$refs.editor.insertImage(image)
			})
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
