<template>
	<div class="mvi-triangle" :style="triangleStyle" :data-placement="placement">
		<div class="mvi-triangle-el" :style="triangleElStyle" :data-placement="placement"></div>
	</div>
</template>

<script>
export default {
	name: 'm-triangle',
	props: {
		//背景色
		background: {
			type: String,
			default: null
		},
		//边框颜色
		borderColor: {
			type: String,
			default: null
		},
		//大小
		size: {
			type: String,
			default: '0.14rem'
		},
		//位置
		placement: {
			type: String,
			default: 'top',
			validator(value) {
				return ['top', 'left', 'right', 'bottom'].includes(value)
			}
		}
	},
	computed: {
		triangleStyle() {
			let style = {}
			style.borderWidth = this.size
			if (this.placement == 'top') {
				style.borderBottomColor = this.borderColor || ''
			} else if (this.placement == 'bottom') {
				style.borderTopColor = this.borderColor || ''
			} else if (this.placement == 'left') {
				style.borderRightColor = this.borderColor || ''
			} else if (this.placement == 'right') {
				style.borderLeftColor = this.borderColor || ''
			}
			return style
		},
		triangleElStyle() {
			let style = {}
			style.borderWidth = `calc(${this.size} - 1px)`
			if (this.placement == 'top') {
				style.borderBottomColor = this.background || ''
				style.marginLeft = `-${this.size}`
			} else if (this.placement == 'bottom') {
				style.borderTopColor = this.background || ''
				style.marginLeft = `-${this.size}`
			} else if (this.placement == 'left') {
				style.borderRightColor = this.background || ''
				style.marginTop = `-${this.size}`
			} else if (this.placement == 'right') {
				style.borderLeftColor = this.background || ''
				style.marginTop = `-${this.size}`
			}
			return style
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-triangle {
	position: relative;
	display: inline-block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;

	&[data-placement='top'] {
		border-top: none;
		border-bottom-color: @border-color;
	}

	&[data-placement='bottom'] {
		border-bottom: none;
		border-top-color: @border-color;
	}

	&[data-placement='left'] {
		border-left: none;
		border-right-color: @border-color;
	}

	&[data-placement='right'] {
		border-right: none;
		border-left-color: @border-color;
	}
}

//内部背景色
.mvi-triangle-el {
	position: absolute;
	display: inline-block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;

	&[data-placement='top'] {
		border-top: none;
		border-bottom-color: @bg-color-default;
		left: 1px;
		top: 1.5px;
		right: auto;
		bottom: 0;
	}

	&[data-placement='bottom'] {
		border-bottom: none;
		border-top-color: @bg-color-default;
		left: 1px;
		bottom: 1.5px;
		top: auto;
		right: auto;
	}

	&[data-placement='left'] {
		border-left: none;
		border-right-color: @bg-color-default;
		left: 1.5px;
		top: 1px;
		right: auto;
		bottom: auto;
	}

	&[data-placement='right'] {
		border-right: none;
		border-left-color: @bg-color-default;
		right: 1.5px;
		top: 1px;
		bottom: auto;
		left: auto;
	}
}
</style>
