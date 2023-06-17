<template>
	<div class="mvi-p-10">
		<div>{{ value }}</div>
		<div class="mvi-mb-4">
			<m-button @click="disabled = !disabled">禁用/启用编辑器</m-button>
		</div>
		<m-editor-menus border useTooltip class="mvi-mb-4" ref="menus">
			<m-editor-menu :disabled="disabled" v-for="item in definedMenus" :name="item.name" />
		</m-editor-menus>
		<m-editor autofocus placeholder="请输入内容" border :disabled="disabled" @change="change" auto-height ref="editor" v-model="value"></m-editor>
	</div>
</template>
<script>
import { definedEditorMenus } from '../packages'
export default {
	data() {
		return {
			//https://www.mvi-web.cn/mvi-resources/images/mvi_image_0_1676971974565.png
			show: true,
			disabled: false,
			value: '<ol><li>十年生死两茫茫，不思量，<video src="https://www.mvi-web.cn/bg.mp4"></video>自难忘。</li><li>十年生死两茫茫，不思量，自难忘。</li><li>十年生死两茫茫，不思量，自难忘。</li></ol><ul><li>十年生死两茫茫，不思量，自难忘。</li><li>十年生死两茫茫，不思量，自难忘。</li><li>十年生死两茫茫，不思量，自难忘。</li></ul><p>十年生死两茫茫</p><blockquote><br></blockquote><p>十年生死两茫茫<a href="https://www.baidu.com">百度一下，你就知道</a><a href="www.baidu.com">百度一下，你就知道</a></p>',
			definedMenus: definedEditorMenus
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.menus)
	},
	methods: {
		change(newVal, oldVal) {
			console.log(newVal)
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
