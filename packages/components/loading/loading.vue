<template>
	<div class="mvi-loading">
		<div v-if="type == 'default'" class="mvi-loading-default" :style="{ width: size, height: size }">
			<div v-for="item in new Array(12)" :style="loadingStyle"></div>
		</div>
		<svg v-else-if="type == 'circle'" xmlns="https://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 38 38" :stroke="color">
			<g fill="none" fill-rule="evenodd">
				<g transform="translate(1 1)" stroke-width="2">
					<circle stroke-opacity=".2" cx="18" cy="18" r="18" />
					<path d="M36 18c0-9.94-8.06-18-18-18">
						<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
					</path>
				</g>
			</g>
		</svg>
		<svg v-else-if="type == 'dots'" xmlns="https://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 240 60" :fill="color">
			<circle cx="30" cy="30" r="30">
				<animate attributeName="r" from="30" to="30" begin="0s" dur="0.8s" values="30;18;30" calcMode="linear" repeatCount="indefinite" />
				<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
			</circle>
			<circle cx="120" cy="30" r="18" fill-opacity="0.3">
				<animate attributeName="r" from="18" to="18" begin="0s" dur="0.8s" values="18;30;18" calcMode="linear" repeatCount="indefinite" />
				<animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s6s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" />
			</circle>
			<circle cx="210" cy="30" r="30">
				<animate attributeName="r" from="30" to="30" begin="0s" dur="0.8s" values="30;18;30" calcMode="linear" repeatCount="indefinite" />
				<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
			</circle>
		</svg>
		<svg v-else-if="type == 'spin'" xmlns="https://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 38 38">
			<defs>
				<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" :id="`spin_${uid}`">
					<stop :stop-color="color" stop-opacity="0" offset="0%" />
					<stop :stop-color="color" stop-opacity=".631" offset="63.146%" />
					<stop :stop-color="color" offset="100%" />
				</linearGradient>
			</defs>
			<g fill="none" fill-rule="evenodd">
				<g transform="translate(1 1)">
					<path d="M36 18c0-9.94-8.06-18-18-18" :stroke="`url(#spin_${uid})`" stroke-width="2">
						<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
					</path>
					<circle :fill="color" cx="36" cy="18" r="1">
						<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
					</circle>
				</g>
			</g>
		</svg>
		<svg v-else-if="type == 'transfer'" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 25 30">
			<rect x="0" y="10" width="5" height="10" :fill="color" opacity="0.2">
				<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
			</rect>
			<rect x="10" y="10" width="5" height="10" :fill="color" opacity="0.2">
				<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
			</rect>
			<rect x="20" y="10" width="5" height="10" :fill="color" opacity="0.2">
				<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
			</rect>
		</svg>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
	name: 'm-loading',
	props: {
		//类型
		type: {
			type: String,
			default: 'default'
		},
		//颜色
		color: {
			type: String,
			default: '#bbb'
		},
		//尺寸
		size: {
			type: String,
			default: '0.6rem'
		}
	},
	setup() {
		return {
			uid: getCurrentInstance().uid
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

.mvi-loading {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	position: relative;

	svg {
		margin: 0;
		padding: 0;
	}
}

//type = 0
@keyframes loading {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}

.mvi-loading-default {
	display: inline-block;
	position: relative;

	& > div {
		display: inline-block;
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		-webkit-animation: loading linear 0.8s infinite;
		animation: loading linear 0.8s infinite;
		border-radius: @radius-default;

		&:nth-child(1) {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
			-webkit-animation-delay: -0.733333333333333s;
			animation-delay: -0.733333333333333s;
		}

		&:nth-child(2) {
			-webkit-transform: rotate(30deg);
			transform: rotate(30deg);
			-webkit-animation-delay: -0.666666666666667s;
			animation-delay: -0.666666666666667s;
		}

		&:nth-child(3) {
			-webkit-transform: rotate(60deg);
			transform: rotate(60deg);
			-webkit-animation-delay: -0.6s;
			animation-delay: -0.6s;
		}

		&:nth-child(4) {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
			-webkit-animation-delay: -0.533333333333333s;
			animation-delay: -0.533333333333333s;
		}

		&:nth-child(5) {
			-webkit-transform: rotate(120deg);
			transform: rotate(120deg);
			-webkit-animation-delay: -0.466666666666667s;
			animation-delay: -0.466666666666667s;
		}

		&:nth-child(6) {
			-webkit-transform: rotate(150deg);
			transform: rotate(150deg);
			-webkit-animation-delay: -0.4s;
			animation-delay: -0.4s;
		}

		&:nth-child(7) {
			-webkit-transform: rotate(180deg);
			transform: rotate(180deg);
			-webkit-animation-delay: -0.333333333333333s;
			animation-delay: -0.333333333333333s;
		}

		&:nth-child(8) {
			-webkit-transform: rotate(210deg);
			transform: rotate(210deg);
			-webkit-animation-delay: -0.266666666666667s;
			animation-delay: -0.266666666666667s;
		}

		&:nth-child(9) {
			-webkit-transform: rotate(240deg);
			transform: rotate(240deg);
			-webkit-animation-delay: -0.2s;
			animation-delay: -0.2s;
		}

		&:nth-child(10) {
			-webkit-transform: rotate(270deg);
			transform: rotate(270deg);
			-webkit-animation-delay: -0.133333333333333s;
			animation-delay: -0.133333333333333s;
		}

		&:nth-child(11) {
			-webkit-transform: rotate(300deg);
			transform: rotate(300deg);
			-webkit-animation-delay: -0.066666666666667s;
			animation-delay: -0.066666666666667s;
		}

		&:nth-child(12) {
			-webkit-transform: rotate(330deg);
			transform: rotate(330deg);
			-webkit-animation-delay: 0s;
			animation-delay: 0s;
		}
	}
}
</style>
