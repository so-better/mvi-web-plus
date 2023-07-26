<template>
	<div class="mvi-p-4">
		<m-editor-menus ref="menus">
			<m-editor-menu v-for="item in menus" :name="item.name"></m-editor-menu>
		</m-editor-menus>
		<m-editor v-mode="value" ref="editor"></m-editor>
	</div>
</template>
<script>
import { EditorDefinedMenuConfig } from '../packages'
export default {
	data() {
		return {
			value: '',
			show: false,
			options: [
				{
					label: '分享到朋友圈'
				},
				{
					label: '分享到QQ空间'
				}
			],
			menus: EditorDefinedMenuConfig
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.menus)
	},
	methods: {
		change(item, index) {
			console.log(item, index)
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
