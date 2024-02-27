<template>
	<div class="mvi-steps" :class="{ vertical: vertical }">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'm-steps',
	data() {
		return {
			//存放step组件的数组
			children: []
		}
	},
	props: {
		//当前步骤
		active: {
			type: Number,
			default: 0
		},
		//是否垂直
		vertical: {
			type: Boolean,
			default: false
		},
		//激活状态的颜色
		activeColor: {
			type: String,
			default: null
		},
		//未激活状态的颜色
		inactiveColor: {
			type: String,
			default: null
		},
		//激活状态的图标
		activeIcon: {
			type: [String, Object],
			default: 'success-o'
		},
		//未激活状态的图标
		inactiveIcon: {
			type: [String, Object],
			default: null
		}
	},
	provide() {
		return {
			steps: this
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-steps {
	display: flex;
	display: -webkit-flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: @mp-sm;
	background-color: #fff;

	&.vertical {
		flex-direction: column;
	}
}
</style>
