<template>
	<div class="mvi-p-4">
		<!-- <m-table border columnBorder :data="data" height="2rem" :columns="columns"> </m-table>
		<m-editor-menus ref="editor-menus">
			<m-editor-menu v-for="item in EditorDefinedMenuConfig" :name="item.name"></m-editor-menu>
		</m-editor-menus>
		<m-editor v-model="value" ref="editor"></m-editor> -->
	</div>
</template>
<script>
import dayjs from 'dayjs'
import { EditorDefinedMenuConfig } from '../packages'
export default {
	data() {
		return {
			spyOpt: {
				el: '#root',
				beforeEnter(el) {
					console.log('beforeEnter', el)
				},
				enter(el) {
					console.log('enter', el)
				},
				beforeLeave(el) {
					console.log('beforeLeave', el)
				},
				leave(el) {
					console.log('leave', el)
				}
			},
			show: true,
			EditorDefinedMenuConfig: EditorDefinedMenuConfig,
			// value: `<ol><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li></ol><table ><tbody><tr><th><br></th><th><br></th><th><br></th><th><br></th><th><br></th><th><br></th><th><br></th></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td><td><br></td></tr></tbody></table>`,
			dayjs: dayjs,
			date: new Date(),
			data: [
				{
					name: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
					age: 14,
					score: 80
				},
				{
					name: '李四',
					age: 16,
					score: 55
				},
				{
					name: '小王',
					age: 15,
					score: 77
				}
			],
			columns: [
				{
					prop: 'name',
					label: '姓名',
					ellipsis: true
				},
				{
					prop: 'age',
					label: '年龄年龄年龄年龄年龄',
					width: '600px',
					ellipsis: true
				},
				{
					prop: 'score',
					label: '分数',
					ellipsis: true,
					width: '600px'
				}
			]
		}
	},
	mounted() {
		//this.$refs.editor.use(this.$refs['editor-menus'])
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
