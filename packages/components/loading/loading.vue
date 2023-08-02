<template>
	<div class="mvi-loading" :style="{ width: size, height: size }">
		<div v-for="item in new Array(12)" :style="loadingStyle"></div>
	</div>
</template>

<script>
export default {
	name: 'm-loading',
	props: {
		//颜色
		color: {
			type: String,
			default: '#bbb'
		},
		//尺寸
		size: {
			type: String,
			default: '0.4rem'
		}
	},
	computed: {
		loadingStyle() {
			let style = {}
			style.background = this.color
			style.width = 'calc(' + this.size + '/20)'
			style.height = 'calc(' + this.size + '/4)'
			style.transformOrigin = 'calc(' + this.size + '/40) calc(' + this.size + '/2)'
			style.webkitTransformOrigin = 'calc(' + this.size + '/40) calc(' + this.size + '/2)'
			return style
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

//type = 0
@keyframes mvi-loading {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}

@-webkit-keyframes mvi-loading {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}

.mvi-loading {
	display: inline-block;
	position: relative;
}

.mvi-loading div {
	display: inline-block;
	position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(-50%);
	-webkit-transform: translateX(-50%);
	-webkit-animation: mvi-loading linear 0.8s infinite;
	animation: mvi-loading linear 0.8s infinite;
	border-radius: @radius-default;
}

.mvi-loading div:nth-child(1) {
	-webkit-transform: rotate(0deg);
	transform: rotate(0deg);
	-webkit-animation-delay: -0.733333333333333s;
	animation-delay: -0.733333333333333s;
}

.mvi-loading div:nth-child(2) {
	-webkit-transform: rotate(30deg);
	transform: rotate(30deg);
	-webkit-animation-delay: -0.666666666666667s;
	animation-delay: -0.666666666666667s;
}

.mvi-loading div:nth-child(3) {
	-webkit-transform: rotate(60deg);
	transform: rotate(60deg);
	-webkit-animation-delay: -0.6s;
	animation-delay: -0.6s;
}

.mvi-loading div:nth-child(4) {
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
	-webkit-animation-delay: -0.533333333333333s;
	animation-delay: -0.533333333333333s;
}

.mvi-loading div:nth-child(5) {
	-webkit-transform: rotate(120deg);
	transform: rotate(120deg);
	-webkit-animation-delay: -0.466666666666667s;
	animation-delay: -0.466666666666667s;
}

.mvi-loading div:nth-child(6) {
	-webkit-transform: rotate(150deg);
	transform: rotate(150deg);
	-webkit-animation-delay: -0.4s;
	animation-delay: -0.4s;
}

.mvi-loading div:nth-child(7) {
	-webkit-transform: rotate(180deg);
	transform: rotate(180deg);
	-webkit-animation-delay: -0.333333333333333s;
	animation-delay: -0.333333333333333s;
}

.mvi-loading div:nth-child(8) {
	-webkit-transform: rotate(210deg);
	transform: rotate(210deg);
	-webkit-animation-delay: -0.266666666666667s;
	animation-delay: -0.266666666666667s;
}

.mvi-loading div:nth-child(9) {
	-webkit-transform: rotate(240deg);
	transform: rotate(240deg);
	-webkit-animation-delay: -0.2s;
	animation-delay: -0.2s;
}

.mvi-loading div:nth-child(10) {
	-webkit-transform: rotate(270deg);
	transform: rotate(270deg);
	-webkit-animation-delay: -0.133333333333333s;
	animation-delay: -0.133333333333333s;
}

.mvi-loading div:nth-child(11) {
	-webkit-transform: rotate(300deg);
	transform: rotate(300deg);
	-webkit-animation-delay: -0.066666666666667s;
	animation-delay: -0.066666666666667s;
}

.mvi-loading div:nth-child(12) {
	-webkit-transform: rotate(330deg);
	transform: rotate(330deg);
	-webkit-animation-delay: 0s;
	animation-delay: 0s;
}
</style>
