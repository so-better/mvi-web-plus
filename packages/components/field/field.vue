<template>
	<div :class="fieldClass" :disabled="disabled || null" :data-type="type">
		<!-- 前置区域 -->
		<div class="mvi-field-prepend" v-if="showPrepend" @click="prependClick">
			<slot v-if="$slots.prepend" name="prepend"></slot>
			<Icon v-else :type="parseIcon(this.prepend).type" :url="parseIcon(this.prepend).url" :spin="parseIcon(this.prepend).spin" :size="parseIcon(this.prepend).size" :color="parseIcon(this.prepend).color" />
		</div>
		<!-- 输入主体 -->
		<div :class="fieldBodyClass" :style="fieldBodyStyle">
			<!-- 前缀区域 -->
			<div class="mvi-field-prefix" v-if="showPrefix" @click="prefixClick">
				<slot v-if="$slots.prefix" name="prefix"></slot>
				<Icon v-else :type="parseIcon(this.prefix).type" :url="parseIcon(this.prefix).url" :spin="parseIcon(this.prefix).spin" :size="parseIcon(this.prefix).size" :color="parseIcon(this.prefix).color" />
			</div>
			<!-- textarea -->
			<textarea ref="textarea" v-if="type == 'textarea'" :disabled="disabled || null" :readonly="readonly || null" class="mvi-field-input" :style="inputStyle" :placeholder="placeholder" v-model="realValue" autocomplete="off" @focus="inputFocus" @blur="inputBlur" :maxlength="maxlength" :name="name" :autofocus="autofocus" :rows="rowsFilter" @input="input" @keydown="keydown" @keyup="keyup"></textarea>
			<!-- input -->
			<input v-else ref="input" :disabled="disabled || null" :readonly="readonly || null" :class="['mvi-field-input', showPrefix ? 'left-none-radius' : '', showSuffix || (clearable && showClear && type != 'textarea') ? 'right-none-radius' : '']" :style="inputStyle" :type="cmpType" :placeholder="placeholder" v-model="realValue" autocomplete="off" :inputmode="inputMode" @focus="inputFocus" @blur="inputBlur" :maxlength="maxlength" :name="name" :autofocus="autofocus" @input="input" @keydown="keydown" @keyup="keyup" />
			<!-- 清除图标 -->
			<div class="mvi-field-clear" v-if="clearable && type != 'textarea'" v-show="showClear" :style="clearStyle" @click="doClear">
				<Icon type="times-o" />
			</div>
			<!-- 后缀区域 -->
			<div class="mvi-field-suffix" v-if="showSuffix" @click="suffixClick">
				<slot v-if="$slots.suffix" name="suffix"></slot>
				<Icon v-else :type="parseIcon(this.suffix).type" :url="parseIcon(this.suffix).url" :spin="parseIcon(this.suffix).spin" :size="parseIcon(this.suffix).size" :color="parseIcon(this.suffix).color" />
			</div>
		</div>
		<!-- 后置区域 -->
		<div class="mvi-field-append" v-if="showAppend" @click="appendClick">
			<slot v-if="$slots.append" name="append"></slot>
			<Icon v-else :type="parseIcon(this.append).type" :url="parseIcon(this.append).url" :spin="parseIcon(this.append).spin" :size="parseIcon(this.append).size" :color="parseIcon(this.append).color" />
		</div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-field',
	emits: ['update:modelValue', 'prepend-click', 'prefix-click', 'append-click', 'suffix-click', 'focus', 'blur', 'input', 'clear', 'keydown', 'keyup'],
	data() {
		return {
			focus: false
		}
	},
	props: {
		//输入框的值
		modelValue: {
			type: [String, Number],
			default: ''
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//是否只读
		readonly: {
			type: Boolean,
			default: false
		},
		//输入框的占位符
		placeholder: {
			type: String,
			default: ''
		},
		//输入框类型
		type: {
			type: String,
			default: 'text',
			validator(value) {
				return ['text', 'password', 'number', 'tel', 'textarea'].includes(value)
			}
		},
		//输入框大小
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['small', 'medium', 'large'].includes(value)
			}
		},
		//输入框最大字符长度
		maxlength: {
			type: Number,
			default: -1
		},
		//输入框是否圆角
		round: {
			type: Boolean,
			default: false
		},
		//输入框是否方形
		square: {
			type: Boolean,
			default: false
		},
		//前缀
		prefix: {
			type: [String, Object],
			default: null
		},
		//后缀
		suffix: {
			type: [String, Object],
			default: null
		},
		//前置
		prepend: {
			type: [String, Object],
			default: null
		},
		//后置
		append: {
			type: [String, Object],
			default: null
		},
		//点击样式
		activeType: {
			type: String,
			default: 'info',
			validator(value) {
				return ['info', 'success', 'warn', 'primary', 'error'].includes(value)
			}
		},
		//点击颜色
		activeColor: {
			type: String,
			default: null,
			validator(value) {
				return Dap.common.matchingText(value, 'hex')
			}
		},
		//是否使用清除图标
		clearable: {
			type: Boolean,
			default: false
		},
		//输入框内容对齐方式
		align: {
			type: String,
			default: 'left',
			validator(value) {
				return ['left', 'center', 'right'].includes(value)
			}
		},
		//原生name
		name: {
			type: String,
			default: null
		},
		//是否自动获取焦点
		autofocus: {
			type: Boolean,
			default: false
		},
		//输入框调起移动端键盘类型
		inputMode: {
			type: [String, Boolean],
			default: false,
			validator(value) {
				return [false, 'none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'].includes(value)
			}
		},
		//文本域行数
		rows: {
			type: Number,
			default: 1
		},
		//文本域高度自适应
		autosize: {
			type: [Boolean, Object],
			default: false
		}
	},
	computed: {
		//图标转换
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
		//是否显示清除图标
		showClear() {
			if (this.disabled || this.readonly) {
				return false
			}
			if (this.realValue && this.focus) {
				return true
			}
			return false
		},
		//清除图标样式
		clearStyle() {
			return {
				borderRadius: this.showSuffix ? 0 : '',
				paddingRight: this.showSuffix ? 0 : ''
			}
		},
		//输入框样式
		inputStyle() {
			return {
				paddingLeft: this.showPrefix ? 0 : '',
				paddingRight: this.showSuffix || (this.showClear && this.clearable) ? 0 : '',
				textAlign: this.align ? this.align : ''
			}
		},
		//输入框父容器样式
		fieldBodyStyle() {
			let style = {}
			if (this.focus && this.activeColor) {
				style.borderColor = this.activeColor
				const rgb = Dap.color.hex2rgb(this.activeColor)
				style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
			}
			return style
		},
		//输入框父容器样式类
		fieldBodyClass() {
			let cls = ['mvi-field-body']
			if (this.showPrepend) {
				cls.push('left-none-radius')
			}
			if (this.showAppend) {
				cls.push('right-none-radius')
			}
			if (!this.activeColor && this.activeType && this.focus) {
				cls.push(this.activeType)
			}
			return cls
		},
		//输入框组件样式类
		fieldClass() {
			let cls = ['mvi-field', this.size]
			if (this.type == 'textarea') {
				return cls
			}
			if (this.round) {
				cls.push('round')
			} else if (this.square) {
				cls.push('square')
			}
			return cls
		},
		//输入框的类型
		cmpType() {
			if (this.type == 'number') {
				return 'text'
			}
			return this.type
		},
		//文本域的rows
		rowsFilter() {
			let rows = this.rows
			if (Dap.common.isObject(this.autosize)) {
				if (Dap.number.isNumber(this.autosize.minRows)) {
					if (this.rows < this.autosize.minRows) {
						rows = this.autosize.minRows
					}
				}
				if (Dap.number.isNumber(this.autosize.maxRows)) {
					if (this.rows > this.autosize.maxRows) {
						rows = this.autosize.maxRows
					}
				}
			}
			return rows
		},
		//输入框的值
		realValue: {
			set(value) {
				if (this.modelValue !== value) {
					this.$emit('update:modelValue', value)
				}
			},
			get() {
				let value = this.modelValue === null ? '' : this.modelValue.toString()
				//数字类型会过滤非数字字符
				if (this.type == 'number') {
					value = value.replace(/\D/g, '')
				}
				//如果设置了maxlength，则进行字符串截取
				if (this.maxlength > 0 && value.length > this.maxlength) {
					value = value.substr(0, this.maxlength)
				}
				if (this.modelValue !== value) {
					this.$emit('update:modelValue', value)
				}
				return value
			}
		},
		//是否显示prepend
		showPrepend() {
			if (this.type == 'textarea') {
				return false
			}
			return this.parseIcon(this.prepend).type || this.parseIcon(this.prepend).url || this.$slots.prepend
		},
		//是否显示prefix
		showPrefix() {
			if (this.type == 'textarea') {
				return false
			}
			return this.parseIcon(this.prefix).type || this.parseIcon(this.prefix).url || this.$slots.prefix
		},
		//显示suffix
		showSuffix() {
			if (this.type == 'textarea') {
				return false
			}
			return this.parseIcon(this.suffix).type || this.parseIcon(this.suffix).url || this.$slots.suffix
		},
		//是否显示prepend
		showPrepend() {
			if (this.type == 'textarea') {
				return false
			}
			return this.parseIcon(this.prepend).type || this.parseIcon(this.prepend).url || this.$slots.prepend
		},
		//是否显示append
		showAppend() {
			if (this.type == 'textarea') {
				return false
			}
			return this.parseIcon(this.append).type || this.parseIcon(this.append).url || this.$slots.append
		}
	},
	components: {
		Icon
	},
	watch: {
		realValue() {
			this.$nextTick(() => {
				if (this.$refs.textarea && (this.autosize == true || Dap.common.isObject(this.autosize))) {
					this.autosizeSet()
				}
			})
		},
		rows() {
			this.$nextTick(() => {
				if (this.$refs.textarea) {
					this.setMaxMinHeight()
				}
			})
		},
		autosize() {
			this.$nextTick(() => {
				if (this.$refs.textarea) {
					this.setMaxMinHeight()
				}
			})
		}
	},
	mounted() {
		if (this.$refs.textarea) {
			this.setMaxMinHeight()
			if (this.autosize == true || Dap.common.isObject(this.autosize)) {
				this.autosizeSet()
			}
		}
	},
	methods: {
		//高度自适应设置
		autosizeSet() {
			this.$refs.textarea.style.overflow = 'hidden'
			this.$refs.textarea.style.height = 'auto'
			this.$refs.textarea.scrollTop = 0
			this.$refs.textarea.style.height = Dap.element.getScrollHeight(this.$refs.textarea) + 'px'
		},
		//行数转为高度
		rows2Height(rows) {
			let lineHeight = Math.floor(parseFloat(Dap.element.getCssStyle(this.$refs.textarea, 'line-height')))
			return rows * lineHeight
		},
		//设置最大高度和最小高度
		setMaxMinHeight() {
			if (Dap.common.isObject(this.autosize)) {
				if (Dap.number.isNumber(this.autosize.maxRows)) {
					let maxHeight = this.rows2Height(this.autosize.maxRows) + parseFloat(Dap.element.getCssStyle(this.$refs.textarea, 'padding-top')) + parseFloat(Dap.element.getCssStyle(this.$refs.textarea, 'padding-bottom'))
					this.$refs.textarea.style.maxHeight = maxHeight + 'px'
				}
				if (Dap.number.isNumber(this.autosize.minRows)) {
					let minHeight = this.rows2Height(this.autosize.minRows) + parseFloat(Dap.element.getCssStyle(this.$refs.textarea, 'padding-top')) + parseFloat(Dap.element.getCssStyle(this.$refs.textarea, 'padding-bottom'))
					this.$refs.textarea.style.minHeight = minHeight + 'px'
				}
			} else {
				this.$refs.textarea.style.maxHeight = ''
				this.$refs.textarea.style.minHeight = ''
			}
		},
		//输入框键盘按下
		keydown(e) {
			if (this.disabled) {
				return
			}
			this.$emit('keydown', e, this.realValue)
		},
		//输入框键盘松开
		keyup(e) {
			if (this.disabled) {
				return
			}
			this.$emit('keyup', e, this.realValue)
		},
		//输入框获取焦点
		inputFocus() {
			if (this.disabled) {
				return
			}
			this.focus = true
			this.$emit('focus', this.realValue)
		},
		//输入框失去焦点
		inputBlur() {
			if (this.disabled) {
				return
			}
			setTimeout(() => {
				this.focus = false
				this.$emit('blur', this.realValue)
			}, 200)
		},
		//输入框实时输入
		input() {
			if (this.disabled) {
				return
			}
			this.$emit('input', this.realValue)
		},
		//点击前置
		prependClick() {
			if (this.disabled) {
				return
			}
			this.$emit('prepend-click', this.realValue)
		},
		//点击前缀
		prefixClick() {
			if (this.disabled) {
				return
			}
			this.$emit('prefix-click', this.realValue)
		},
		//点击后置
		appendClick() {
			if (this.disabled) {
				return
			}
			this.$emit('append-click', this.realValue)
		},
		//点击后缀
		suffixClick() {
			if (this.disabled) {
				return
			}
			this.$emit('suffix-click', this.realValue)
		},
		//清除
		doClear() {
			if (this.disabled) {
				return
			}
			if (!this.clearable) {
				return
			}
			setTimeout(() => {
				this.realValue = ''
				let el = this.$refs.input || this.$refs.textarea
				el.focus()
				this.$emit('clear', this.realValue)
			}, 210)
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-field {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	border-radius: @radius-default;
	color: @font-color-default;
	background-color: #fff;

	&.small {
		font-size: @font-size-default;

		&:not([data-type='textarea']) {
			height: @small-height;

			.mvi-field-input {
				padding: 0 @mp-sm;
			}
		}

		&[data-type='textarea'] .mvi-field-input {
			padding: @mp-xs @mp-sm;
		}

		.mvi-field-prepend,
		.mvi-field-append,
		.mvi-field-prefix,
		.mvi-field-suffix,
		.mvi-field-clear {
			padding: 0 @mp-sm;
		}
	}

	&.medium {
		font-size: @font-size-h6;

		&:not([data-type='textarea']) {
			height: @medium-height;

			.mvi-field-input {
				padding: 0 @mp-md;
			}
		}

		&[data-type='textarea'] .mvi-field-input {
			padding: @mp-sm @mp-md;
		}

		.mvi-field-prepend,
		.mvi-field-append,
		.mvi-field-prefix,
		.mvi-field-suffix,
		.mvi-field-clear {
			padding: 0 @mp-md;
		}
	}

	&.large {
		font-size: @font-size-h5;

		&:not([data-type='textarea']) {
			height: @large-height;

			.mvi-field-input {
				padding: 0 @mp-lg;
			}
		}

		&[data-type='textarea'] .mvi-field-input {
			padding: @mp-md @mp-lg;
		}

		.mvi-field-prepend,
		.mvi-field-append,
		.mvi-field-prefix,
		.mvi-field-suffix,
		.mvi-field-clear {
			padding: 0 @mp-lg;
		}
	}

	&.round {
		border-radius: @radius-round;
	}

	&.square {
		border-radius: 0;
	}

	&[disabled] {
		opacity: 0.6;
	}
}

.mvi-field-append,
.mvi-field-prepend {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	border-radius: 0;
	background-color: @bg-color-dark;

	&:hover {
		cursor: pointer;
	}
}

.mvi-field-prepend {
	border-top-left-radius: inherit;
	border-bottom-left-radius: inherit;
}

.mvi-field-append {
	border-top-right-radius: inherit;
	border-bottom-right-radius: inherit;
}

.mvi-field-body {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	flex: 1;
	background-color: inherit;
	border-radius: inherit;
	border: 1px solid @border-color;
	transition: border-color 600ms, box-shadow 600ms;
	-webkit-transition: border-color 600ms, box-shadow 600ms;

	&.info {
		border-color: @info-normal;
		box-shadow: 0 0 0.16rem @info-shadow;
	}

	&.success {
		border-color: @success-normal;
		box-shadow: 0 0 0.16rem @success-shadow;
	}

	&.warn {
		border-color: @warn-normal;
		box-shadow: 0 0 0.16rem @warn-shadow;
	}

	&.primary {
		border-color: @primary-normal;
		box-shadow: 0 0 0.16rem @primary-shadow;
	}

	&.error {
		border-color: @error-normal;
		box-shadow: 0 0 0.16rem @error-shadow;
	}

	&.left-none-radius {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	&.right-none-radius {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.mvi-field-prefix,
	.mvi-field-suffix,
	.mvi-field-clear {
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

	.mvi-field-clear {
		opacity: 0.6;
	}

	.mvi-field-prefix {
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	.mvi-field-suffix,
	.mvi-field-clear {
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
	}

	.mvi-field-input {
		appearance: none;
		display: block;
		width: 100%;
		flex: 1;
		margin: 0;
		padding: 0;
		border: none;
		border-radius: inherit;
		background-color: inherit;
		color: inherit;
		font-size: inherit;
		height: 100%;
		line-height: 1.5;
		resize: none;
		font-family: inherit;

		&::-webkit-input-placeholder,
		&::placeholder {
			color: inherit;
			font-family: inherit;
			font-size: inherit;
			opacity: 0.5;
			vertical-align: middle;
		}

		&.left-none-radius {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		&.right-none-radius {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		&[disabled] {
			background-color: inherit;
			color: inherit;
			opacity: 1;
		}
	}
}
</style>
