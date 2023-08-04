<template>
	<div class="mvi-collapse">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'm-collapse',
	data() {
		return {
			//存放collapse-item组件的数组
			children: []
		}
	},
	emits: ['update:modelValue', 'before-slide-down', 'slide-down', 'before-slide-up', 'slide-up'],
	props: {
		//默认展开的面板索引
		modelValue: {
			type: [Number, Array],
			default: null
		},
		//是否手风琴模式
		accordion: {
			type: Boolean,
			default: false
		},
		//是否显示每个面板的内下边框
		inBorder: {
			type: Boolean,
			default: true
		},
		//是否展示每个面板的外下边框
		outBorder: {
			type: Boolean,
			default: true
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//点击标题栏是否显示点击态
		active: {
			type: Boolean,
			default: true
		},
		//是否对标题栏的标题和内容使用单行限制
		noWrap: {
			type: Boolean,
			default: false
		}
	},
	provide() {
		return {
			collapse: this
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-collapse {
	display: block;
	width: 100%;
	background-color: #fff;

	:deep(.mvi-collapse-item:last-child) {
		&.border::after {
			border-bottom: none;
		}

		.mvi-collapse-cell.border:not(.expand)::after {
			border-bottom: none;
		}
	}
}
</style>
