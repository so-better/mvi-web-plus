<template>
	<div :class="fieldClass" :disabled="disabled || null" :data-type="type">
		<div class="mvi-field-prepend" v-if="(prependIconType || prependIconUrl || $slots.prepend) && type != 'textarea'" :style="prependStyle" @click="prependClick">
			<slot v-if="$slots.prepend" name="prepend"></slot>
			<Icon v-else-if="prependIconType || prependIconUrl" :type="prependIconType" :url="prependIconUrl" :spin="prependIconSpin" :size="prependIconSize" :color="prependIconColor" />
		</div>
		<div :class="fieldBodyClass" :style="fieldBodyStyle">
			<div class="mvi-field-prefix" v-if="(prefixIconType || prefixIconUrl || $slots.prefix) && type != 'textarea'" @click="prefixClick">
				<slot v-if="$slots.prefix" name="prefix"></slot>
				<Icon v-else-if="prefixIconType || prefixIconUrl" :type="prefixIconType" :url="prefixIconUrl" :spin="prefixIconSpin" :size="prefixIconSize" :color="prefixIconColor" />
			</div>
			<textarea ref="textarea" v-if="type == 'textarea'" :disabled="disabled || null" :readonly="readonly || null" class="mvi-field-input" :style="inputStyle" :placeholder="placeholder" v-model="realValue" autocomplete="off" @focus="inputFocus" @blur="inputBlur" :maxlength="maxlength" :name="name" :autofocus="autofocus" :rows="rowsFilter" @input="input"></textarea>
			<input v-else ref="input" :disabled="disabled || null" :readonly="readonly || null" class="mvi-field-input" :style="inputStyle" :type="computedType" :placeholder="placeholder" v-model="realValue" autocomplete="off" :inputmode="computedInputMode" @focus="inputFocus" @blur="inputBlur" :maxlength="maxlength" :name="name" :autofocus="autofocus" @input="input" />
			<div class="mvi-field-clear" @click="doClear" v-if="clearable && type != 'textarea'" v-show="showClearIcon" :style="clearStyle">
				<Icon type="times-o" />
			</div>
			<div class="mvi-field-suffix" v-if="(suffixIconType || suffixIconUrl || $slots.suffix) && type != 'textarea'" @click="suffixClick">
				<slot v-if="$slots.suffix" name="suffix"></slot>
				<Icon v-else-if="suffixIconType || suffixIconUrl" :type="suffixIconType" :url="suffixIconUrl" :spin="suffixIconSpin" :size="suffixIconSize" :color="suffixIconColor" />
			</div>
		</div>
		<div class="mvi-field-append" v-if="(appendIconType || appendIconUrl || $slots.append) && type != 'textarea'" :style="appendStyle" @click="appendClick">
			<slot v-if="$slots.append" name="append"></slot>
			<Icon v-else-if="appendIconType || appendIconUrl" :type="appendIconType" :url="appendIconUrl" :spin="appendIconSpin" :size="appendIconSize" :color="appendIconColor" />
		</div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-field',
	emits: ['update:modelValue', 'prepend-click', 'prefix-click', 'append-click', 'suffix-click', 'focus', 'blur', 'input', 'clear'],
	data() {
		return {
			focus: false
		}
	},
	props: {
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
		//输入框的值
		modelValue: {
			type: [String, Number],
			default: ''
		},
		//输入框的占位符
		placeholder: {
			type: String,
			default: ''
		},
		//输入框类型
		type: {
			type: String,
			default: 'text'
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
		//前置背景色
		prependBackground: {
			type: String,
			default: null
		},
		//前置字体颜色
		prependColor: {
			type: String,
			default: null
		},
		//后置背景色
		appendBackground: {
			type: String,
			default: null
		},
		//后置字体颜色
		appendColor: {
			type: String,
			default: null
		},
		//自定义边框颜色
		borderColor: {
			type: String,
			default: null
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
		//是否显示清除图标
		showClearIcon() {
			if (this.disabled || this.readonly) {
				return false
			}
			if (this.realValue && this.focus) {
				return true
			} else {
				return false
			}
		},
		//清除图标样式
		clearStyle() {
			let style = {}
			if ((this.suffixIconType || this.suffixIconUrl || this.$slots.suffix) && this.type != 'textarea') {
				style.borderRadius = 0
			}
			return style
		},
		//前置样式
		prependStyle() {
			let style = {}
			if (this.prependBackground) {
				style.backgroundColor = this.prependBackground
			}
			if (this.prependColor) {
				style.color = this.prependColor
			}
			return style
		},
		//后置样式
		appendStyle() {
			let style = {}
			if (this.appendBackground) {
				style.backgroundColor = this.appendBackground
			}
			if (this.appendColor) {
				style.color = this.appendColor
			}
			return style
		},
		//输入框样式
		inputStyle() {
			let style = {}
			if ((this.$slots.prefix || this.prefixIconType || this.prefixIconUrl) && this.type != 'textarea') {
				style.paddingLeft = 0
			}
			if ((this.$slots.suffix || this.suffixIconType || this.suffixIconUrl || (this.showClearIcon && this.clearable)) && this.type != 'textarea') {
				style.paddingRight = 0
			}
			if (this.align) {
				style.textAlign = this.align
			}
			return style
		},
		//输入框父容器样式
		fieldBodyStyle() {
			let style = {}
			if (this.focus) {
				if (this.activeColor) {
					style.borderColor = this.activeColor
					const rgb = Dap.color.hex2rgb(this.activeColor)
					style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
				}
			} else {
				if (this.borderColor) {
					style.borderColor = this.borderColor
				}
			}
			return style
		},
		//输入框父容器样式类
		fieldBodyClass() {
			let cls = ['mvi-field-body']
			if ((this.prependIconType || this.prependIconUrl || this.$slots.prepend) && this.type != 'textarea') {
				cls.push('mvi-field-body-left')
			}
			if ((this.appendIconType || this.appendIconUrl || this.$slots.append) && this.type != 'textarea') {
				cls.push('mvi-field-body-right')
			}
			if (!this.activeColor && this.activeType && this.focus) {
				cls.push('mvi-field-body-' + this.activeType)
			}
			return cls
		},
		//输入框组件样式类
		fieldClass() {
			let cls = ['mvi-field', 'mvi-field-' + this.size]
			if (this.round && this.type != 'textarea') {
				cls.push('mvi-field-round')
			} else if (this.square) {
				cls.push('mvi-field-square')
			}
			return cls
		},
		//输入框的类型
		computedType() {
			if (this.type == 'number') {
				return 'text'
			} else {
				return this.type
			}
		},
		//输入框键盘类型
		computedInputMode() {
			let mode = false
			if (typeof this.inputMode == 'string') {
				mode = this.inputMode
			}
			return mode
		},
		//前置图标类型
		prependIconType() {
			let type = null
			if (Dap.common.isObject(this.prepend)) {
				if (typeof this.prepend.type == 'string') {
					type = this.prepend.type
				}
			} else if (typeof this.prepend == 'string') {
				type = this.prepend
			}
			return type
		},
		//前置图标url
		prependIconUrl() {
			let url = null
			if (Dap.common.isObject(this.prepend)) {
				if (typeof this.prepend.url == 'string') {
					url = this.prepend.url
				}
			}
			return url
		},
		//前置图标旋转
		prependIconSpin() {
			let spin = false
			if (Dap.common.isObject(this.prepend)) {
				if (typeof this.prepend.spin == 'boolean') {
					spin = this.prepend.spin
				}
			}
			return spin
		},
		//前置图标大小
		prependIconSize() {
			let size = null
			if (Dap.common.isObject(this.prepend)) {
				if (typeof this.prepend.size == 'string') {
					size = this.prepend.size
				}
			}
			return size
		},
		//前置图标颜色
		prependIconColor() {
			let color = null
			if (Dap.common.isObject(this.prepend)) {
				if (typeof this.prepend.color == 'string') {
					color = this.prepend.color
				}
			}
			return color
		},
		//后置图标类型
		appendIconType() {
			let type = null
			if (Dap.common.isObject(this.append)) {
				if (typeof this.append.type == 'string') {
					type = this.append.type
				}
			} else if (typeof this.append == 'string') {
				type = this.append
			}
			return type
		},
		//后置图标url
		appendIconUrl() {
			let url = null
			if (Dap.common.isObject(this.append)) {
				if (typeof this.append.url == 'string') {
					url = this.append.url
				}
			}
			return url
		},
		//后置图标旋转
		appendIconSpin() {
			let spin = false
			if (Dap.common.isObject(this.append)) {
				if (typeof this.append.spin == 'boolean') {
					spin = this.append.spin
				}
			}
			return spin
		},
		//后置图标大小
		appendIconSize() {
			let size = null
			if (Dap.common.isObject(this.append)) {
				if (typeof this.append.size == 'string') {
					size = this.append.size
				}
			}
			return size
		},
		//后置图标颜色
		appendIconColor() {
			let color = null
			if (Dap.common.isObject(this.append)) {
				if (typeof this.append.color == 'string') {
					color = this.append.color
				}
			}
			return color
		},
		//前缀图标类型
		prefixIconType() {
			let type = null
			if (Dap.common.isObject(this.prefix)) {
				if (typeof this.prefix.type == 'string') {
					type = this.prefix.type
				}
			} else if (typeof this.prefix == 'string') {
				type = this.prefix
			}
			return type
		},
		//前缀图标url
		prefixIconUrl() {
			let url = null
			if (Dap.common.isObject(this.prefix)) {
				if (typeof this.prefix.url == 'string') {
					url = this.prefix.url
				}
			}
			return url
		},
		//前缀图标旋转
		prefixIconSpin() {
			let spin = false
			if (Dap.common.isObject(this.prefix)) {
				if (typeof this.prefix.spin == 'boolean') {
					spin = this.prefix.spin
				}
			}
			return spin
		},
		//前缀图标大小
		prefixIconSize() {
			let size = null
			if (Dap.common.isObject(this.prefix)) {
				if (typeof this.prefix.size == 'string') {
					size = this.prefix.size
				}
			}
			return size
		},
		//前缀图标颜色
		prefixIconColor() {
			let color = null
			if (Dap.common.isObject(this.prefix)) {
				if (typeof this.prefix.color == 'string') {
					color = this.prefix.color
				}
			}
			return color
		},
		//后缀图标类型
		suffixIconType() {
			let type = null
			if (Dap.common.isObject(this.suffix)) {
				if (typeof this.suffix.type == 'string') {
					type = this.suffix.type
				}
			} else if (typeof this.suffix == 'string') {
				type = this.suffix
			}
			return type
		},
		//后缀图标url
		suffixIconUrl() {
			let url = null
			if (Dap.common.isObject(this.suffix)) {
				if (typeof this.suffix.url == 'string') {
					url = this.suffix.url
				}
			}
			return url
		},
		//后缀图标旋转
		suffixIconSpin() {
			let spin = false
			if (Dap.common.isObject(this.suffix)) {
				if (typeof this.suffix.spin == 'boolean') {
					spin = this.suffix.spin
				}
			}
			return spin
		},
		//后缀图标大小
		suffixIconSize() {
			let size = null
			if (Dap.common.isObject(this.suffix)) {
				if (typeof this.suffix.size == 'string') {
					size = this.suffix.size
				}
			}
			return size
		},
		//后缀图标颜色
		suffixIconColor() {
			let color = null
			if (Dap.common.isObject(this.suffix)) {
				if (typeof this.suffix.color == 'string') {
					color = this.suffix.color
				}
			}
			return color
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
		}
	},
	components: {
		Icon
	},
	watch: {
		realValue(newValue) {
			this.$nextTick(() => {
				if (this.$refs.textarea && (this.autosize == true || Dap.common.isObject(this.autosize))) {
					this.autosizeSet()
				}
			})
		},
		rows(newValue) {
			this.$nextTick(() => {
				if (this.$refs.textarea) {
					this.setMaxMinHeight()
				}
			})
		},
		autosize(newValue) {
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
		//输入框获取焦点
		inputFocus() {
			if (this.disabled) {
				return
			}
			this.$emit('focus', this.realValue)
			setTimeout(() => {
				this.focus = true
			}, 200)
		},
		//输入框失去焦点
		inputBlur() {
			if (this.disabled) {
				return
			}
			this.$emit('blur', this.realValue)
			setTimeout(() => {
				this.focus = false
			}, 200)
		},
		//输入框实时输入
		input(e) {
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
			this.realValue = ''
			let el = this.$refs.input || this.$refs.textarea
			el.focus()
			this.$emit('clear', '')
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

	&.mvi-field-small {
		font-size: @font-size-small;

		&:not([data-type='textarea']) {
			height: @small-height;

			.mvi-field-input {
				padding: 0 @mp-sm;
			}
		}

		&[data-type='textarea'] .mvi-field-input {
			padding: @mp-sm;
			line-height: 0.28rem;
		}

		.mvi-field-prepend,
		.mvi-field-append,
		.mvi-field-prefix,
		.mvi-field-suffix,
		.mvi-field-clear {
			padding: 0 @mp-sm;
		}
	}

	&.mvi-field-medium {
		font-size: @font-size-default;

		&:not([data-type='textarea']) {
			height: @medium-height;

			.mvi-field-input {
				padding: 0 @mp-md;
			}
		}

		&[data-type='textarea'] .mvi-field-input {
			padding: 0 @mp-md;
			line-height: 0.44rem;
		}

		.mvi-field-prepend,
		.mvi-field-append,
		.mvi-field-prefix,
		.mvi-field-suffix,
		.mvi-field-clear {
			padding: 0 @mp-md;
		}
	}

	&.mvi-field-large {
		font-size: @font-size-h6;

		&:not([data-type='textarea']) {
			height: @large-height;

			.mvi-field-input {
				padding: 0 @mp-lg;
			}
		}

		&[data-type='textarea'] .mvi-field-input {
			padding: 0 @mp-lg;
			line-height: 0.56rem;
		}

		.mvi-field-prepend,
		.mvi-field-append,
		.mvi-field-prefix,
		.mvi-field-suffix,
		.mvi-field-clear {
			padding: 0 @mp-lg;
		}
	}

	&.mvi-field-round {
		border-radius: @radius-round;
	}

	&.mvi-field-square {
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
	background-color: @border-color;

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
		-webkit-appearance: none;
		-moz-appearance: none;
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

		&[disabled] {
			background-color: inherit;
			color: inherit;
		}
	}

	&.mvi-field-body-info {
		border-color: @info-normal;
		box-shadow: 0 0 0.16rem @info-shadow;
	}

	&.mvi-field-body-success {
		border-color: @success-normal;
		box-shadow: 0 0 0.16rem @success-shadow;
	}

	&.mvi-field-body-warn {
		border-color: @warn-normal;
		box-shadow: 0 0 0.16rem @warn-shadow;
	}

	&.mvi-field-body-primary {
		border-color: @primary-normal;
		box-shadow: 0 0 0.16rem @primary-shadow;
	}

	&.mvi-field-body-error {
		border-color: @error-normal;
		box-shadow: 0 0 0.16rem @error-shadow;
	}

	&.mvi-field-body-left {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	&.mvi-field-body-right {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
}
</style>
