<template>
	<i v-if="url" :class="['mvi-icon-url', spin ? 'spin' : '']" :style="iconStyle"></i>
	<i v-else :class="['mvi-icon', 'icon-' + type, spin ? 'spin' : '']" :style="iconStyle"></i>
</template>

<script>
export default {
	name: 'm-icon',
	props: {
		//图标类型
		type: {
			type: String,
			default: ''
		},
		//是否旋转
		spin: {
			type: Boolean,
			default: false
		},
		//图标的图片链接
		url: {
			type: String,
			default: null
		},
		//图标尺寸
		size: {
			type: String,
			default: null
		},
		//图标颜色
		color: {
			type: String,
			default: null
		}
	},
	computed: {
		iconStyle() {
			let style = {}
			if (this.url) {
				style.backgroundImage = 'url(' + this.url + ')'
				if (this.size) {
					style.width = this.size
					style.height = this.size
				}
			} else {
				if (this.size) {
					style.fontSize = this.size
				}
				if (this.color) {
					style.color = this.color
				}
			}
			return style
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';
@import '../../css/mvi-icon.less';

.mvi-icon {
	display: inline-flex;
	font-family: 'mvi-icon' !important;
	font-style: normal;
	vertical-align: middle;
	justify-content: center;
	align-items: center;
	font-size: inherit;
	line-height: 1;

	&.spin {
		animation: spin 1.4s linear infinite;
		-webkit-animation: spin 1.4s linear infinite;
	}
}

.mvi-icon-url {
	display: inline-block;
	width: 0.28rem;
	height: 0.28rem;
	vertical-align: middle;
	background-size: cover;
	-webkit-background-size: cover;
	background-repeat: no-repeat;
	background-position: center;

	&.spin {
		animation: spin 1.4s linear infinite;
		-webkit-animation: spin 1.4s linear infinite;
	}
}

//旋转
@keyframes spin {
	from {
		transform: rotateZ(0deg);
		transform-origin: center;
	}

	to {
		transform: rotateZ(360deg);
		transform-origin: center;
	}
}
@-webkit-keyframes spin {
	from {
		transform: rotateZ(0deg);
		transform-origin: center;
	}

	to {
		transform: rotateZ(360deg);
		transform-origin: center;
	}
}
</style>
