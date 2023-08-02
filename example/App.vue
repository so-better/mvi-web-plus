<template>
	<div class="mvi-p-20">
		<!-- 菜单栏 -->
		<m-editor-menus class="mvi-mb-4" ref="menus">
			<!-- 菜单项 -->
			<m-editor-menu v-for="item in definedMenus" :name="item.name" />
		</m-editor-menus>
		<!-- 编辑器 -->
		<m-editor html-paste ref="editor" v-model="value" placeholder="Please Enter Text ..."></m-editor>
	</div>
</template>
<script>
import { EditorDefinedMenuConfig } from '../packages'
import moment from 'moment'
export default {
	data() {
		return {
			definedMenus: EditorDefinedMenuConfig,
			moment: moment,
			date: moment('2023-08').toDate(),
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
			list: ['佛罗里达州', '加利福利亚州', '北京', '伦敦', 'aaa', 'bbb', 'AAAA']
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.menus)
	},
	methods: {
		change(val, list) {}
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
