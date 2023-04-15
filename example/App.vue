<template>
	<div class="mvi-p-2">
		<div>{{ value }}</div>
		<m-button @click="disabled = !disabled">按钮</m-button>
		<m-editor-menus border ref="editorMenus"></m-editor-menus>
		<m-editor @format-elements="formatElements" :disabled="disabled" border placeholder="Please Enter Text..." v-model="value" ref="editor"></m-editor>
	</div>
</template>
<script>
import { remove } from '@vue/shared'

export default {
	data() {
		return {
			show: true,
			disabled: false,
			value: '<table mvi-editor-element="32" cellpadding="0" cellspacing="0"><colgroup><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"><col width="auto"></colgroup><tbody mvi-editor-element="32"><tr mvi-editor-element="32"><td mvi-editor-element="32"><br><span contenteditable="false" class="mvi-editor-colbtn"></span></td><td mvi-editor-element="32"><br><span contenteditable="false" class="mvi-editor-colbtn"></span></td><td mvi-editor-element="32"><br><span contenteditable="false" class="mvi-editor-colbtn"></span></td><td mvi-editor-element="32"><br><span contenteditable="false" class="mvi-editor-colbtn"></span></td><td mvi-editor-element="32"><br><span contenteditable="false" class="mvi-editor-colbtn"></span></td><td mvi-editor-element="32"><br><span contenteditable="false" class="mvi-editor-colbtn"></span></td><td mvi-editor-element="32"><br></td></tr><tr mvi-editor-element="32"><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td></tr><tr mvi-editor-element="32"><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td><td mvi-editor-element="32"><br></td></tr></tbody></table>'
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.editorMenus)
	},
	methods: {
		formatElements(addNode, removeNode) {
			console.log(addNode, removeNode)
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
