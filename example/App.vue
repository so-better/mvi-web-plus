<template>
	<div class="mvi-p-4">
		<m-editor-menus border useTooltip class="mvi-mb-4" ref="menus">
			<m-editor-menu v-for="item in definedMenus" :name="item.name" />
		</m-editor-menus>
		<!-- {{ value }} -->
		<m-editor ref="editor" v-model="value" autofocus placeholder="Please Enter Text" height="4rem" autoheight border active-color="#10837f" html-paste custom-image-paste @paste-image="change"></m-editor>
	</div>
</template>
<script>
import { definedEditorMenus } from '../packages'
export default {
	data() {
		return {
			value: '<p><br></p>',
			definedMenus: definedEditorMenus
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.menus)
	},
	methods: {
		change(newVal, oldVal) {
			this.$refs.editor.insertImage(newVal)
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
