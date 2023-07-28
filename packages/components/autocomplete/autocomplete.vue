<template>
	<div :data-id="'mvi-autocomplete-' + uid" :class="autocompleteClass" :disabled="disabled || null">
		<div :class="targetClass" :style="targetStyle" :data-id="'mvi-autocomplete-target-' + uid" ref="target">
			<div @click="leftClick" v-if="parseIcon(leftIcon).type || parseIcon(leftIcon).url" class="mvi-autocomplete-left-icon">
				<Icon :type="parseIcon(leftIcon).type" :url="parseIcon(leftIcon).url" :spin="parseIcon(leftIcon).spin" :size="parseIcon(leftIcon).size" :color="parseIcon(leftIcon).color" />
			</div>
			<input ref="input" @input="input" v-model="realValue" type="text" :placeholder="placeholder" :style="inputStyle" :name="name" @focus="inputFocus" @blur="inputBlur" :disabled="disabled || null" autocomplete="off" />
			<div @click="doClear" v-if="clearable" v-show="showClearIcon" class="mvi-autocomplete-clear" :style="clearStyle">
				<Icon type="times-o" />
			</div>
			<div class="mvi-autocomplete-right-icon" v-if="parseIcon(rightIcon).type || parseIcon(rightIcon).url" @click="rightClick">
				<Icon :type="parseIcon(rightIcon).type" :url="parseIcon(rightIcon).url" :spin="parseIcon(rightIcon).spin" :size="parseIcon(rightIcon).size" :color="parseIcon(rightIcon).color" />
			</div>
		</div>
		<Layer :model-value="show" :target="`[data-id='mvi-autocomplete-target-${uid}']`" :root="`[data-id='mvi-autocomplete-${uid}']`" :placement="layerRealProps.placement" :offset="layerRealProps.offset" :fixed="layerRealProps.fixed" :z-index="layerRealProps.zIndex" :fixed-auto="layerRealProps.fixedAuto" ref="layer" :wrapper-class="layerRealProps.wrapperClass" :animation="layerRealProps.animation" :shadow="layerRealProps.shadow" :border="layerRealProps.border" :timeout="layerRealProps.timeout" :closable="false" :show-triangle="layerRealProps.showTriangle" :border-color="layerRealProps.borderColor" :background="layerRealProps.background" @showing="layerShow">
			<div class="mvi-autocomplete-menu" :style="menuStyle" ref="menu">
				<div class="mvi-autocomplete-list" v-for="item in computedFilter" v-text="item" @click="doSelect(item)"></div>
			</div>
		</Layer>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Icon } from '../icon'
import { Layer } from '../layer'
export default {
	name: 'm-autocomplete',
	data() {
		return {
			focus: false
		}
	},
	emits: ['update:modelValue', 'focus', 'blur', 'input', 'left-click', 'right-click', 'select', 'clear'],
	props: {
		//输入框的值
		modelValue: {
			type: String,
			default: ''
		},
		//占位符
		placeholder: {
			type: String,
			default: ''
		},
		//组件大小
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['small', 'medium', 'large'].includes(value)
			}
		},
		//可选值数组
		list: {
			type: Array,
			default: function () {
				return []
			}
		},
		//激活样式
		activeType: {
			type: String,
			default: 'info',
			validator(value) {
				return ['info', 'success', 'warn', 'error', 'primary'].includes(value)
			}
		},
		//激活颜色
		activeColor: {
			type: String,
			default: null,
			validator(value) {
				return Dap.common.matchingText(value, 'hex')
			}
		},
		//过滤方法
		filterMethod: {
			type: [Function, Boolean],
			default: false
		},
		//是否启用清除图标
		clearable: {
			type: Boolean,
			default: false
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//layer组件参数
		layerProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//提示框最大高度
		height: {
			type: String,
			default: null
		},
		//原生name
		name: {
			type: String,
			default: null
		},
		//左侧图标
		leftIcon: {
			type: [String, Object],
			default: null
		},
		//右侧图标
		rightIcon: {
			type: [String, Object],
			default: null
		},
		//是否圆角
		round: {
			type: Boolean,
			default: false
		},
		//是否方形
		square: {
			type: Boolean,
			default: false
		},
		//对齐方式
		align: {
			type: String,
			default: 'left',
			validator(value) {
				return ['left', 'right', 'center'].includes(value)
			}
		}
	},
	components: {
		Icon,
		Layer
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	computed: {
		show() {
			return this.focus && this.computedFilter.length != 0
		},
		//左侧图标
		parseIcon() {
			return param => {
				let icon = {
					spin: false,
					type: null,
					url: null,
					color: null,
					size: null
				}
				if (Dap.common.isObject(param)) {
					if (typeof param.spin == 'boolean') {
						icon.spin = param.spin
					}
					if (typeof param.type == 'string') {
						icon.type = param.type
					}
					if (typeof param.url == 'string') {
						icon.url = param.url
					}
					if (typeof param.color == 'string') {
						icon.color = param.color
					}
					if (typeof param.size == 'string') {
						icon.size = param.size
					}
				} else if (typeof param == 'string') {
					icon.type = param
				}
				return icon
			}
		},
		showClearIcon() {
			if (this.disabled) {
				return false
			}
			if (this.realValue && this.focus) {
				return true
			}
			return false
		},
		clearStyle() {
			let style = {}
			if (this.parseIcon(this.rightIcon).type || this.parseIcon(this.rightIcon).url) {
				style.borderRadius = 0
			}
			return style
		},
		menuStyle() {
			let style = {}
			if (this.height) {
				style.maxHeight = this.height
			}
			return style
		},
		computedFilter() {
			if (typeof this.filterMethod == 'function') {
				return this.filterMethod(this.realValue, this.list)
			}
			if (this.filterMethod) {
				return this.defaultFilter()
			}
			return this.list
		},
		inputStyle() {
			let style = {}
			if (this.parseIcon(this.leftIcon).type || this.parseIcon(this.leftIcon).url) {
				style.paddingLeft = 0
			}
			if ((this.showClearIcon && this.clearable) || this.parseIcon(this.rightIcon).type || this.parseIcon(this.rightIcon).url) {
				style.paddingRight = 0
			}
			if (this.align) {
				style.textAlign = this.align
			}
			return style
		},
		autocompleteClass() {
			let cls = ['mvi-autocomplete', this.size]
			if (this.round) {
				cls.push('round')
			} else if (this.square) {
				cls.push('square')
			}
			return cls
		},
		targetStyle() {
			let style = {}
			if (this.activeColor && this.focus) {
				style.borderColor = this.activeColor
				const rgb = Dap.color.hex2rgb(this.activeColor)
				style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
			}
			return style
		},
		targetClass() {
			let cls = ['mvi-autocomplete-target']
			if (this.activeType && !this.activeColor && this.focus) {
				cls.push(this.activeType)
			}
			return cls
		},
		realValue: {
			set(value) {
				if (this.modelValue !== value) {
					this.$emit('update:modelValue', value)
				}
			},
			get() {
				return this.modelValue
			}
		},
		layerRealProps() {
			return {
				placement: this.layerProps.placement ? this.layerProps.placement : 'bottom-start',
				fixed: typeof this.layerProps.fixed == 'boolean' ? this.layerProps.fixed : false,
				fixedAuto: typeof this.layerProps.fixedAuto == 'boolean' ? this.layerProps.fixedAuto : false,
				width: this.layerProps.width,
				zIndex: Dap.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
				offset: this.layerProps.offset ? this.layerProps.offset : '0.1rem',
				wrapperClass: this.layerProps.wrapperClass,
				animation: this.layerProps.animation,
				timeout: Dap.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
				showTriangle: typeof this.layerProps.showTriangle == 'boolean' ? this.layerProps.showTriangle : false,
				shadow: typeof this.layerProps.shadow == 'boolean' ? this.layerProps.shadow : true,
				border: typeof this.layerProps.border == 'boolean' ? this.layerProps.border : false,
				borderColor: this.layerProps.borderColor,
				background: this.layerProps.background
			}
		}
	},
	methods: {
		//悬浮层显示前进行宽度设置
		layerShow() {
			if (this.layerRealProps.width) {
				this.$refs.menu.style.width = this.layerRealProps.width
			} else {
				this.$refs.menu.style.width = this.$refs.target.offsetWidth + 'px'
			}
		},
		rightClick(e) {
			if (this.disabled) {
				return
			}
			this.$emit('right-click', this.realValue)
		},
		leftClick(e) {
			if (this.disabled) {
				return
			}
			this.$emit('left-click', this.realValue)
		},
		input() {
			if (this.disabled) {
				return
			}
			this.focus = true
			this.$refs.layer.reset()
			this.$emit('input', this.realValue)
		},
		inputBlur() {
			if (this.disabled) {
				return
			}
			setTimeout(() => {
				this.focus = false
				this.$emit('blur', this.realValue)
			}, 100)
		},
		inputFocus() {
			if (this.disabled) {
				return
			}
			this.focus = true
			this.$emit('focus', this.realValue)
		},
		doClear() {
			if (this.disabled) {
				return
			}
			if (!this.clearable) {
				return
			}
			setTimeout(() => {
				this.realValue = ''
				this.$emit('clear', '')
				this.$refs.input.focus()
			}, 110)
		},
		doSelect(item) {
			if (this.disabled) {
				return
			}
			this.realValue = item
			this.$emit('select', item)
			this.focus = false
		},
		//默认过滤方法
		defaultFilter() {
			return this.list.filter(item => {
				return String(item).toLocaleLowerCase().includes(this.realValue.toLocaleLowerCase())
			})
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-autocomplete {
	display: block;
	width: 100%;
	border-radius: @radius-default;
	color: @font-color-default;
	position: relative;
	background-color: #fff;

	&.round {
		border-radius: @radius-round;
	}

	&.square {
		border-radius: 0;
	}

	&.small {
		font-size: @font-size-small;
		height: @small-height;

		.mvi-autocomplete-left-icon,
		.mvi-autocomplete-right-icon,
		.mvi-autocomplete-clear {
			padding: 0 @mp-sm;
		}

		input {
			padding: 0 @mp-sm;
		}

		.mvi-autocomplete-list {
			padding: @mp-sm;
		}
	}

	&.medium {
		font-size: @font-size-default;
		height: @medium-height;

		.mvi-autocomplete-left-icon,
		.mvi-autocomplete-right-icon,
		.mvi-autocomplete-clear {
			padding: 0 @mp-md;
		}

		input {
			padding: 0 @mp-md;
		}

		.mvi-autocomplete-list {
			padding: @mp-md;
		}
	}

	&.large {
		font-size: @font-size-h6;
		height: @large-height;

		.mvi-autocomplete-left-icon,
		.mvi-autocomplete-right-icon,
		.mvi-autocomplete-clear {
			padding: 0 @mp-lg;
		}

		input {
			padding: 0 @mp-lg;
		}

		.mvi-autocomplete-list {
			padding: @mp-lg;
		}
	}

	&[disabled] {
		opacity: 0.6;
	}
}

.mvi-autocomplete-target {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	border-radius: inherit;
	border: 1px solid @border-color;
	transition: border-color 600ms, box-shadow 600ms;
	-webkit-transition: border-color 600ms, box-shadow 600ms;
	box-shadow: none;

	input {
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		display: block;
		width: 100%;
		height: 100%;
		flex: 1;
		margin: 0;
		padding: 0;
		border: none;
		border-radius: inherit;
		background-color: inherit;
		color: inherit;
		font-size: inherit;

		&::-webkit-input-placeholder,
		&::placeholder {
			color: inherit;
			font-family: inherit;
			font-size: inherit;
			opacity: 0.5;
			vertical-align: middle;
		}

		&[disabled] {
			background-color: inherit;
			color: inherit;
		}
	}

	//左侧图标、右侧图标、清除图标
	.mvi-autocomplete-left-icon,
	.mvi-autocomplete-right-icon,
	.mvi-autocomplete-clear {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		border-radius: 0;

		&:hover {
			cursor: pointer;
		}
	}

	.mvi-autocomplete-clear {
		opacity: 0.6;
	}

	.mvi-autocomplete-left-icon {
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	.mvi-autocomplete-right-icon,
	.mvi-autocomplete-clear {
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
	}

	&.info {
		border-color: @info-normal;
		box-shadow: 0 0 0.16rem @info-shadow;
	}

	&.success {
		border-color: @success-normal;
		box-shadow: 0 0 0.16rem @success-shadow;
	}

	&.primary {
		border-color: @primary-normal;
		box-shadow: 0 0 0.16rem @primary-shadow;
	}

	&.warn {
		border-color: @warn-normal;
		box-shadow: 0 0 0.16rem @warn-shadow;
	}

	&.error {
		border-color: @error-normal;
		box-shadow: 0 0 0.16rem @error-shadow;
	}
}

//悬浮层
.mvi-autocomplete-menu {
	display: block;
	padding: @mp-xs 0;
	overflow: auto;
	overflow-x: hidden;

	.mvi-autocomplete-list {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.mvi-autocomplete-list:hover {
		cursor: pointer;
		background-color: @bg-color-default;
	}
}
</style>
