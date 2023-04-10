<template>
	<div class="mvi-p-2">
		<div>{{ value }}</div>
		<m-editor-menus
			:customActive="customActive"
			:config="[
				{ key: 'codeView', name: '显示源码', icon: 'eye', data: show, index: 1 },
				{
					key: 'aaa',
					name: '自定义',
					icon: 'user',
					data: [
						{ label: 'aaa', value: 'aaa' },
						{ label: 'bbb', value: 'bbb' }
					],
					value: 'aaa',
					index: 1
				}
			]"
			border
			ref="editorMenus"></m-editor-menus>
		<m-editor placeholder="请输入内容..." border v-model="value" ref="editor"></m-editor>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: true,
			value: '<h5>3333</h5><h6>333</h6>'
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
		customActive(key, data, node) {
			console.log(key, data, node)
			return {
				active: true,
				value: 'bbb'
			}
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
