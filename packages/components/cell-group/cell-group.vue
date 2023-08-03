<template>
	<div :class="['mvi-cell-group', border ? 'border' : '']">
		<div class="mvi-cell-group-title" v-text="title" v-if="title"></div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'm-cell-group',
	props: {
		//单元格组标题
		title: {
			type: String,
			default: null
		},
		//下边框
		border: {
			type: Boolean,
			default: true
		},
		//是否显示点击态
		active: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-cell-group {
	display: block;
	width: 100%;
	margin-bottom: @mp-md;

	.mvi-cell-group-title {
		padding: @mp-md @mp-sm;
		color: @font-color-sub;
		font-size: @font-size-default;
	}

	&.border :deep(.mvi-cell.border:last-child::after) {
		border: none;
	}
}
</style>
