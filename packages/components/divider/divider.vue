<template>
	<div :class="['mvi-divider', dashed ? 'mvi-divider-dashed' : '']">
		<div class="mvi-divider-left" :style="{ borderColor: color || '' }"></div>
		<div v-if="this.$slots.default" class="mvi-divider-center">
			<slot></slot>
		</div>
		<div class="mvi-divider-right" :style="{ borderColor: color || '' }"></div>
	</div>
</template>

<script>
export default {
	name: 'm-divider',
	props: {
		//是否使用虚线
		dashed: {
			type: Boolean,
			default: false
		},
		//线颜色
		color: {
			type: String,
			default: null
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-divider {
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	color: @font-color-mute;
	user-select: none;
	-ms-user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
}

.mvi-divider-left {
	flex: 1;
	display: block;
	height: 0px;
	border-top: 1px solid @border-color;
}

.mvi-divider-center {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin: 0 @mp-sm;
}

.mvi-divider-right {
	flex: 1;
	display: block;
	height: 0px;
	border-top: 1px solid @border-color;
}

.mvi-divider.mvi-divider-dashed > .mvi-divider-left,
.mvi-divider.mvi-divider-dashed > .mvi-divider-right {
	border-top-style: dashed;
}
</style>
