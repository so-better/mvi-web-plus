<template>
	<div class="mvi-p-10">
		<div>{{ value }}</div>
		<div class="mvi-mb-4">
			<m-button @click="disabled = !disabled">禁用/启用编辑器</m-button>
		</div>
		<m-editor-menus trigger="click" useTooltip class="mvi-mb-4" ref="menus">
			<m-editor-menu :disabled="disabled" v-for="item in definedMenus" :name="item.name" />
			<!-- <m-editor-menu type="select" icon="user" name="custom" @custom="customMenu">
				<template #layer>222</template>
			</m-editor-menu> -->
		</m-editor-menus>
		<m-editor placeholder="请输入内容" autofocus border :disabled="disabled" @change="change" auto-height ref="editor" v-model="value"></m-editor>
	</div>
</template>
<script>
import { definedMenus } from '../packages/components/editor-menu'
export default {
	data() {
		return {
			show: true,
			disabled: false,
			value: '<br>',
			definedMenus: definedMenus
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
