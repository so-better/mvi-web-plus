<template>
	<div class="mvi-p-10">
		<div>{{ value }}</div>
		<div class="mvi-mb-4">
			<m-button @click="disabled = !disabled">禁用/启用编辑器</m-button>
		</div>
		<m-editor-menus border useTooltip class="mvi-mb-4" ref="menus">
			<m-editor-menu :disabled="disabled" v-for="item in definedMenus" :name="item.name" />
		</m-editor-menus>
		<m-editor placeholder="请输入内容" border :disabled="disabled" @change="change" auto-height ref="editor" v-model="value"></m-editor>
	</div>
</template>
<script>
import { definedEditorMenus } from '../packages'
export default {
	data() {
		return {
			show: true,
			disabled: false,
			value: '<p><span style="color:#f30;"><span style="color:#78af3d">十年生死两茫茫，不思量，自难忘。</span></span></p><p>千里孤坟，<span style="font-weight:bold;color:#798af1">无处话凄凉</span>。</p><p>纵使相逢应不识，尘满面，鬓如霜。</p>',
			definedMenus: definedEditorMenus
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.menus)
	},
	methods: {
		change(newVal, oldVal) {
			console.log(newVal, oldVal)
		},
		pasteFile(files) {
			//console.log(files)
		},
		customMenu(res) {
			console.log('触发自定义菜单操作', res)
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
