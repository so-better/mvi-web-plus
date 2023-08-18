<template>
	<div class="mvi-p-4">
		<m-editor-menus ref="editor-menus">
			<m-editor-menu v-for="item in EditorDefinedMenuConfig" :name="item.name"></m-editor-menu>
		</m-editor-menus>
		<m-editor v-model="value" ref="editor"></m-editor>
	</div>
</template>
<script>
import dayjs from 'dayjs'
import { EditorDefinedMenuConfig } from '../packages'
export default {
	data() {
		return {
			EditorDefinedMenuConfig: EditorDefinedMenuConfig,
			value: '',
			dayjs: dayjs
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs['editor-menus'])
	},
	methods: {}
}
</script>
<style lang="less">
html {
	font-size: 50px;
}

#app {
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
}

.a-tabs {
	.mvi-tab-header.active {
		background-color: #053b7e !important;
		font-weight: bold;
	}

	.mvi-tabs-header.card {
		border-color: #053b7e !important;
	}

	.mvi-tabs-header.card .mvi-tab-header {
		border-right-color: #053b7e !important;
	}
}
</style>
