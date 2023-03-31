<template>
	<div class="mvi-menus-dialog"></div>
</template>
<script>
export default {
	props: {
		//弹层是否显示
		modelValue: {
			type: Boolean,
			default: false
		},
		//菜单项配置
		options: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//弹层位置
		points: {
			type: Array,
			default: function () {
				retrn[(0, 0)]
			}
		}
	},
	emits: ['update:modelValue'],
	watch: {
		//监听进行更新位置
		points: {
			immediate: true,
			deep: true,
			handler: function (newVal) {}
		}
	},
	methods: {}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-menus-dialog {
	display: block;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;
	padding: @mp-sm;
	background-color: #fff;
}
</style>
