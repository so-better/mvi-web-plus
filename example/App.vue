<template>
	<div class="mvi-p-4">
		<div>
			<m-button @click="change">插入html</m-button>
		</div>
		<m-editor-menus use-tooltip class="mvi-mb-4" ref="menus">
			<m-editor-menu v-for="item in definedMenus" :name="item.name" />
		</m-editor-menus>
		<!-- {{ value }} -->
		<m-editor ref="editor" v-model="value" autofocus placeholder="Please Enter Text" height="4rem" autoheight border active-color="#10837f" htmlPaste></m-editor>
	</div>
</template>
<script>
import { EditorDefinedMenuConfig } from '../packages'
export default {
	data() {
		return {
			value: '<p><br></p>',
			definedMenus: EditorDefinedMenuConfig
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.menus)
	},
	methods: {
		change() {
			this.$refs.editor.setTextStyle({
				color: 'red'
			})
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
